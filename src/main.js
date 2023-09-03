import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcons from './core/fontAwesomeIcons';
import { v4 as uuidv4 } from 'uuid';
import store from "./core/store";
import {addRoute, router } from "./router";

import pageService from "./core/pageService";

pageService.getAll().then((pages) => {
    store.pages = pages;

    pages.forEach(page => {
        addRoute(page.path);
    });

    const app = createApp(App);
    FontAwesomeIcons.config(app);
    app.config.globalProperties.$uuidv4 = uuidv4;
    
    app.use(router());
    app.mount('#app');    
});




import 'bootstrap';