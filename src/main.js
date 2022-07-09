import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcons from './core/fontAwesomeIcons';
import router from "./router";

const app = createApp(App);
FontAwesomeIcons.config(app);

app.use(router);
app.mount('#app');

import 'bootstrap';