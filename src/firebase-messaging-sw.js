const origin = self.location.origin;
// please don't move this code location to prevent system from handle click automatically and prevent use from call event listener.
self.addEventListener("notificationclick", function (event) {
  let data = event.notification.data;
  event.notification.close();
  // open url after notification click
  const routing = data.FCMMSG.data.routing;
  const url = origin + routing;
  console.log(event);
  self.clients.openWindow(url);
});

importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

let firebaseConfig;
if (origin.indexOf("localhost") > 0 || origin.indexOf("10.21.10.245") > 0) {
  // staging env
  // for test only

  firebaseConfig = {
    apiKey: "AIzaSyAmgMp-dV4bkIsixLzSwF23JSfF3pc0Tk",
    authDomain: "ecms-staging.firebaseapp.com",
    projectId: "ecms-staging",
    storageBucket: "ecms-staging.appspot.com",
    messagingSenderId: "300863038478",
    appId: "1:300863038478:web:5867b4ed70d197b7b8c85f",
    measurementId: "G-PW9FSS9HPG",
    vapidKey:
      "BMfuLHUqKCYjsPieQyuDOFGRgVFXd_H-WUA9jhyYmw0uBc1zgVPCZ9cOYDth7rlPm3W_hpjLFfOlG6LVMA5ho9I",
  };
} else if (origin.indexOf("10.24.10.245")) {
  // dev env
  // for test only
  firebaseConfig = {
    apiKey: "AIzaSyBXj0wavO5PMs_vzOA3dxjaatWGGoE1yBQ",
    authDomain: "ecms-dev-75719.firebaseapp.com",
    projectId: "ecms-dev-75719",
    storageBucket: "ecms-dev-75719.appspot.com",
    messagingSenderId: "219094975807",
    appId: "1:219094975807:web:c46b7a14ef56203acfff8a",
    vapidKey:
      "BKFJp9wQN4w9lMshYt5rOkT4BWxQVxryqgl-c-AzVBRrxtsYD9V79FtzPCBz0_Fh69hQ6R5y6vaWux8zD9O39o4",
  };
} else {
  // prod env
  firebaseConfig = {
    apiKey: "AIzaSyAJEmaLjWewp8rxKS9nHABmZq1RANR9zN0",
    authDomain: "ecms-bdc26.firebaseapp.com",
    projectId: "ecms-bdc26",
    storageBucket: "ecms-bdc26.appspot.com",
    messagingSenderId: "390401346167",
    appId: "1:390401346167:web:1f3d4b6914480d73c95472",
    vapidKey:
      "BPQS6tE8rEcyywn0Vtx-9xyjGOj5iVMPKedtwdly413Zv9EJ3Qj8NnUvlpo9HvJSpMg1Smq8OkAetdKEKuL33yQ",
  };
}
if (firebase.messaging.isSupported()) {

 firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
}
