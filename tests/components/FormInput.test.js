import {it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import FormInput from "@/components/forms/FormInput.vue";

const wrapper = mount(FormInput, {
  options: {
    inputType: "text",
    label: "Name",
    name: "name"
  },
  value: "My Name Is",
  disabled: false
});

it("testing FormInput component props", async () => {
  expect(wrapper.props.value).toContain("My Name Is");
});