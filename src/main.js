import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcons from './core/fontAwesomeIcons';

const app = createApp(App);
FontAwesomeIcons.config(app);

app.mount('#app');

import 'bootstrap';