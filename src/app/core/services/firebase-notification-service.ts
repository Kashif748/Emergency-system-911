import {Injectable} from "@angular/core";
import {getMessaging, getToken, onMessage, isSupported} from "firebase/messaging";
import {environment} from "../../../environments/environment";
import {IAuthService} from "@core/services/auth.service";
import {IStorageService} from "@core/services/storage.service";
import {AppCacheKeys} from "@core/constant/AppCacheKeys";

@Injectable()
export class FirebaseNotificationService {

  constructor(private readonly authService: IAuthService, private storageService: IStorageService) {
  }


  async requestPermission() {
    const isBrowserSupportFCM = await isSupported();
    console.log("isBrowserSupportFCM", isBrowserSupportFCM);
    if (!isBrowserSupportFCM) {
      return;
    }
    const messaging = getMessaging();
    const firebaseToken = this.storageService.getItem(AppCacheKeys.USER_FIREBASE_TOKEN);
    if (!firebaseToken) {
      getToken(messaging,
        {vapidKey: environment.firebase.vapidKey}).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            this.sendFirebaseTokenToServer(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    }
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }

  private sendFirebaseTokenToServer(currentToken: string) {
    this.authService.sendFireBaseToken(currentToken).subscribe(res => {
      console.log("firebase res", res);
      this.storageService.setItem(AppCacheKeys.USER_FIREBASE_TOKEN, currentToken);
    }, (error) => {
      console.log("firebase error", error);
    });
  }
}
