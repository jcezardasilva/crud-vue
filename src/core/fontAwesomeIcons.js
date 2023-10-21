import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faClipboard, faList, faMagnifyingGlass, faPlus, faRotateRight,faPencil, faTrash, faTable, faFileLines ,faFolderTree, faGear } from '@fortawesome/free-solid-svg-icons';

export function config(app){
    
    library.add([faDownload,faClipboard, faFileLines, faFolderTree, faList, faMagnifyingGlass, faPlus, faRotateRight,faPencil, faTable, faTrash,faGear]);

    app.component('font-awesome-icon', FontAwesomeIcon);
}
export default {config};