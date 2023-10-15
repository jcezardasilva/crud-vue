import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcons from './core/fontAwesomeIcons';
import { v4 as uuidv4 } from 'uuid';
import { i18n } from "./core/language";
import store from "./core/store";
import {addRoute, router } from "./router";

import entityService from "./core/entityService";

entityService.getAll().then((entities) => {
    store.entities = entities;
    store.crudEntities = entities.filter(e=> !e.isReadonly);

    store.crudEntities.forEach(entity => {
        addRoute(entity.path);
    });

    const app = createApp(App);
    FontAwesomeIcons.config(app);
    app.config.globalProperties.$uuidv4 = uuidv4;
    app.use(i18n);
    app.use(router());
    app.mount('#app');    
});




import 'bootstrap';