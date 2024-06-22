import {build_base_html} from "./html-skeleton.js";
import {Store} from "./modelClases.js";
build_base_html();
await Store.initialize();
// console.log(Store.stores);