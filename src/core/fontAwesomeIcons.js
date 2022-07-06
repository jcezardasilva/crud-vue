import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export function config(app){
    
    library.add([faClipboard]);

    app.component('font-awesome-icon', FontAwesomeIcon);
}
export default {config};