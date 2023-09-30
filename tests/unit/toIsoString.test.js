import {it, expect} from "vitest";
import { toISOString } from "@/core/dateService";

const date = new Date("01/01/2023")
it("testing formatting data to ISO string", async () => {
    expect(toISOString(date)).toBe("2023-01-01 03:00:00");
  });