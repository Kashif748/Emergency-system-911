import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IAuthService} from '@core/services/auth.service';
import {IStorageService} from '@core/services/storage.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {getMessaging, getToken, isSupported, MessagePayload, onMessage,} from 'firebase/messaging';
import {AppCacheKeys} from '@core/constant/AppCacheKeys';
import {DashboardService} from 'src/app/pages/dashboard/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  isSidebarVisible: boolean;
  private popup: boolean;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  isBrowserSupportFCM$: Subject<boolean> = new Subject<boolean>();
  onNewMessage$: Subject<MessagePayload> = new Subject<MessagePayload>();

  private popupStore = new BehaviorSubject<boolean>(this.popup);
  public get popup$() {
    return this.popupStore.asObservable();
  }
  popupNotifications = [];
  private popupNotifStore = new BehaviorSubject<any[]>([]);
  public get unreadNotificationInPopup$() {
    return this.popupNotifStore.asObservable();
  }

  notifications = [];
  private notifStore = new BehaviorSubject<any[]>([]);
  public get notification$() {
    return this.notifStore.asObservable();
  }

  private unreadCount = 0;
  private unreadCountStore = new BehaviorSubject<number>(this.unreadCount);
  public get unreadCount$() {
    return this.unreadCountStore.asObservable();
  }

  constructor(
    private http: HttpClient,
    private readonly authService: IAuthService,
    private storageService: IStorageService,
    private dashboardService: DashboardService
  ) {
    this.sidebarVisibilityChange.subscribe((value) => {
      this.isSidebarVisible = value;
    });
    this.requestPermission();
  }
  async requestPermission() {
    const isBrowserSupportFCM = await isSupported();
    this.isBrowserSupportFCM$.next(isBrowserSupportFCM);
    console.log('isBrowserSupportFCM', isBrowserSupportFCM);
    if (!isBrowserSupportFCM) {
      return;
    }
    const firebaseToken = this.storageService.getItem(
      AppCacheKeys.USER_FIREBASE_TOKEN
    );
    const messaging = getMessaging();
    if (!firebaseToken) {
      getToken(messaging, { vapidKey: environment.firebase.vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            this.sendFirebaseTokenToServer(currentToken);
            this.listen(messaging);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.'
            );
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      this.listen(messaging);
    }
  }

  listen(messaging) {
    onMessage(messaging, (payload) => {
      this.onNewMessage$.next(payload);
      console.log('Message received. ', payload);
      this.dashboardService.checkLogsChanges(payload);
      setTimeout(async () => {
        await this.getNotifications().subscribe();
        this.setPopupValue(true);
      }, 8000);
    });
  }

  private sendFirebaseTokenToServer(currentToken: string) {
    this.authService.sendFireBaseToken(currentToken).subscribe(
      (res) => {
        console.log('firebase res', res);
        this.storageService.setItem(
          AppCacheKeys.USER_FIREBASE_TOKEN,
          currentToken
        );
      },
      (error) => {
        console.log('firebase error', error);
      }
    );
  }
  getNotifications(page = 0, size = 15) {
    return this.http
      .get<any>(`${environment.apiUrl}/inapp-notif`, {
        params: { page: page + '', size: size + '' },
      })
      .pipe(
        map((r) =>
          r.result.content.map((n) => {
            try {
              return {
                ...n,
                message: JSON.parse(n.message ?? '{}'),
              };
            } catch {
              return {
                ...n,
                message: {
                  ar: {
                    body: n.message,
                  },
                  en: {
                    body: n.message,
                  },
                },
              };
            }
          })
        ),
        tap((notifications) => {
          this.notifications = [...notifications, ...this.notifications];
          this.notifStore.next(this.notifications);
          this.refreshCount();

          const unreadNotifications = notifications.filter((notification) => !notification.read && notification.popup === true);
          this.popupNotifications = [...unreadNotifications];
          this.popupNotifStore.next(this.popupNotifications);
        })
      );
  }

  setPopupValue(popup: boolean) {
    this.popup = popup;
    this.popupStore.next(popup);
  }

  markAsRead(id) {
    return this.http
      .put(`${environment.apiUrl}/inapp-notif/mark-read/${id}`, {})
      .subscribe((value) => {
        this.notifications.find((n) => n.id == id).read = true;
        this.notifStore.next(this.notifications);
        this.decreaseCount();
      });
  }

  markAllAsRead() {
    return this.http
      .put(`${environment.apiUrl}/inapp-notif/mark-all-read`, {})
      .subscribe((v) => {
        this.notifications.forEach(
          (notification) => (notification.read = true)
        );
        this.notifStore.next(this.notifications);
        this.resetNotificationCount();
      });
  }

  markImportantNotifiAllAsRead(id) {
    return this.http
      .put(`${environment.apiUrl}/inapp-notif/mark-read/`, null, {
        params: { ids: [id] },
      })
      .subscribe((value) => {
        this.notifications.forEach(
          (notification) => (notification.read = true)
        );
        this.notifStore.next(this.notifications);
        this.resetNotificationCount();
      });
  }

  increaseCount() {
    this.unreadCount++;
    this.unreadCountStore.next(this.unreadCount);
  }

  decreaseCount() {
    this.unreadCount--;
    this.unreadCountStore.next(this.unreadCount);
  }

  resetNotificationCount() {
    this.unreadCount = 0;
    this.unreadCountStore.next(this.unreadCount);
  }

  refreshCount() {
    this.http
      .get<any>(`${environment.apiUrl}/inapp-notif/unread`)
      .pipe(
        map((r) => r.result),
        tap((count) => {
          this.unreadCount = count;
          this.unreadCountStore.next(this.unreadCount);
        })
      )
      .subscribe();
  }

  getCount() {
    return this.http
      .get<any>(`${environment.apiUrl}/inapp-notif/unread`)
      .pipe(map((r) => r.result));
  }

  toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.isSidebarVisible);
  }
}
