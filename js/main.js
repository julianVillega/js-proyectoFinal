import { ResultContainer } from "./components/resultContainer.js";
import {build_base_html} from "./html-skeleton.js";
import {Store, Price, Product} from "./modelClases.js";

await Store.initialize();
await Price.initialize();
await Product.initialize();

build_base_html();
//initialize the result container.
ResultContainer.addAllStores();