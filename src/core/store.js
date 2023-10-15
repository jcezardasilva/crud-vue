import { reactive} from "vue";

const state = reactive({
    entities: [],
    crudEntities: [],
    path: "/home",
    entity: {},
    values: {},
    viewMode: "table",
    table: {
        fields: [],
        items: []
    },
    form: {
        action: "",
        id: {},
        fields: [],
        item: {},
        itemNumber: 1,
        pagination: [],
        table: {
            map: null,
            index: 0,
            name: "",
            entity: "",
            action: "update",
            fields: [],
            items: []
        }
    },
    modal: {
        action: "",
        fields: [],
        map: null,
        visible: false,
        title: "",
        type: "entity",
        values: {}
    },
    updatedAt: null
})
export default state;