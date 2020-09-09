// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultDateFormat: 'DD-MM-YYYY',
  defaultPageSize: 20,
  pusher: {
    key: '2bdb1c457286cdef1545',
  },
  firebase : {
    apiKey: "AIzaSyA214MV-NJoUN5eeWlBZStrjEIHCl7zkH0",
    authDomain: "catering-qoot.firebaseapp.com",
    databaseURL: "https://catering-qoot.firebaseio.com",
    projectId: "catering-qoot",
    storageBucket: "catering-qoot.appspot.com",
    messagingSenderId: "764718239643",
    appId: "1:764718239643:web:5ae10fa255383f4943db3e",
    measurementId: "G-94ZRXHQQLP"
  },

  //  api_url: 'https://backend-qoot.qoot.onlineapi',
  api_imges: 'https://catering.qoot.online/',
  api_url: 'https://catering.qoot.online/api',
  defaultLanguage: 'en',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
