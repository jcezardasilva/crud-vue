import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcons from './core/fontAwesomeIcons';
import { v4 as uuidv4 } from 'uuid';
import { i18n } from "./core/language";
import store from "./core/store";
import {addRoutes, routerBuilder } from "./router";

import entityService from "./core/entityService";

entityService.getAll().then((entities) => {
    store.entities = entities;
    store.systemEntities = entities.filter(e=> e.type == "system");
    store.businessEntities = entities.filter(e=> e.type == "business");
    store.crudEntities = store.businessEntities.filter(e=> !e.isReadonly);

    addRoutes(store.entities.map(e=>e.path));

    const app = createApp(App);
    FontAwesomeIcons.config(app);
    app.config.globalProperties.$uuidv4 = uuidv4;
    app.use(i18n);
    app.use(routerBuilder());
    app.mount('#app');    
});




import 'bootstrap';