import { reactive} from "vue";

const state = reactive({
    entities: [],
    currentEntity: "/home",
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
        multilineEntity: "",
        multilineFields: [],
        multilineItems: [],
        multilineIndex: 0,
        multilineAction: "update"
    }
})
export default state;