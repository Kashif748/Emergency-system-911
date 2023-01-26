import { isEmpty } from 'lodash';
import { Router } from '@angular/router';
import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Injectable()
export class PushNotificationsService {
  public permission: Permission;
  count = 0;
  subscriptions: Subscription[] = [];
  constructor(private router: Router , private zone: NgZone) {
    this.permission = this.isSupported() ? "default" : "denied";

  }

  public isSupported(): boolean {
    return "Notification" in window;
  }

  requestPermission(): void {
    let self = this;
    if ("Notification" in window) {
      Notification.requestPermission(function (status) {
        return (self.permission = status);
      });
    }
  }

  create(title: string, options?: PushNotification): any {
    let self = this;
    return new Observable(function (obs) {
      if (!("Notification" in window)) {
        //console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission !== "granted") {
        // //console.log(&quot;The user hasn't granted you permission to send push notifications&quot;);
        obs.complete();
      }
      let _notify = new Notification(title, options);
      _notify.onshow = function (e) {
        return obs.next({
          notification: _notify,
          event: e,
        });
      };

      _notify.onclick = function (e) {

        if(!isEmpty(options['route'])){
        self.zone.run(() => {
          // console.log('onclick');
          self.router.navigate([options['route']]);

      });
    }

        return obs.next({
          notification: _notify,
          event: e,
        });
      };
      _notify.onerror = function (e) {
        return obs.error({
          notification: _notify,
          event: e,
        });
      };
      _notify.onclose = function () {
        return obs.complete();
      };
    });
  }

  private countStore = new BehaviorSubject(this.count);
  public count$ = this.countStore.asObservable();

  private updateCount(state) {
    this.count = state;
    this.countStore.next(state);
  }
  public resetCount() {
    this.updateCount(0);
  }

  generateNotification(source): void {
    let self = this;
    let counts = 1;
    // console.log("called" ,counts)
    source.forEach((item, index) => {
      let options = {
        body: item.alertContent,
        route : item.route,
        icon: "&quot;../resource/images/bell-icon.png&quot;",
      } as PushNotification;

      let notify = self.create(item.title, options).subscribe(
        (res) => {
          //   console.log(res, "===========================================")
        },
        (err) => console.log(err)
      );
      this.count++;
      // counts++;
      this.updateCount(this.count);
      //this.subscriptions.push(notify)
    });
  }



  remove() {
    //this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}

export declare type Permission = "denied" | "granted" | "default";

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: "auto" | "ltr" | "rtl";
  lang?: string;
  vibrate?: number[];
}
