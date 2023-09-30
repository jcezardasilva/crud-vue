import {it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import CommandBar from "@/components/CommandBar.vue";

const date = new Date();
const wrapper = mount(CommandBar, {
  update: date
});

it("testing CommandBar component props", async () => {
  expect(wrapper.props.value).toContain(date);
  expect(wrapper.find(".update-time")).text().toContain(date);
});