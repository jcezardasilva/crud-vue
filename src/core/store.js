import { reactive} from "vue";

const state = reactive({
    entities: [],
    path: "/home",
    entity: {},
    values: {},
    data: {
        fields: [],
        items: []
    },
    viewMode: "table",
    table: {
        fields: [],
        items: []
    },
    form: {
        action: "",
        fields: [],
        item: {},
        itemNumber: 1,
        pagination: [],
        table: {
            index: 0,
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