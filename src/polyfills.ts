/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';

import "jspdf/dist/polyfills.es.js";

import 'zone.js/dist/zone';  // Included with Angular CLI.

(window as any).global = window;

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
