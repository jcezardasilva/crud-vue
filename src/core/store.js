import { reactive} from "vue";

const state = reactive({
    entities: [],
    currentEntity: "/home",
    entity: null,
    values: {},
    data: {
        fields: [],
        items: []
    },
    viewMode: "table",
    form: {
        action: "",
        fields: [],
        item: {},
        itemNumber: 1,
        pagination: [],
        multilineEntity: "",
        multilineFields: [],
        multilineItems: [],
        multilineIndex: 0,
        multilineAction: "update"
    },
    modal: {
        map: null,
        visible: false,
        title: "",
        type: "entity",
        values: {}
    },
    updatedAt: null
})
export default state;