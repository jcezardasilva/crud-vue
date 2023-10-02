import {test, expect} from "vitest";
import {mount} from "@vue/test-utils";
import DataCell from "@/components/tables/DataCell.vue";

test("testing DataCell component props", async () => {
  const value = "a test value";
  const wrapper = mount(DataCell, {
    propsData: {
        value: value
      }
  });
  expect(wrapper.text()).toBe(value);
  expect(wrapper.props("value")).toBe(value);
  expect(wrapper.props().value).toBe(value);
});