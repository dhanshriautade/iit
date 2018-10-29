// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let base_url='http://localhost:2100';
export const environment = {
  production: false,
  login: base_url + '/auth/login',
  register: base_url + '/auth/register',
  checkAnswar: base_url + '/auth/checkAnswar',
  selectProfileForEdit:base_url+'/user_master/selectProfileForEdit',
  updateProfile:base_url+'/user_master/updateProfile'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
