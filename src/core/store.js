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
        multilineItems: []
    }
})
export default state;