import { describe, expect, it } from "vitest";
import { NOMBRES, nextNotification, NOTIFICATION_DURATION, NOTIFICATION_INTERVAL } from "@/lib/social-notifications";

describe("Social notification rules", () => {
  it("appears every 12 seconds", () => { expect(NOTIFICATION_INTERVAL).toBe(12000); });
  it("hides after 5 seconds", () => { expect(NOTIFICATION_DURATION).toBe(5000); });
  it("never repeats the previous name, even with constant randomness", () => {
    for (const previous of NOMBRES) {
      expect(nextNotification(previous, () => 0).nombre).not.toBe(previous);
      expect(nextNotification(previous, () => 0.999).nombre).not.toBe(previous);
    }
  });
  it("uses exactly the four requested time options", () => {
    expect([0, 0.25, 0.5, 0.75].map((value) => nextNotification("", () => value).tiempo))
      .toEqual(["hace 2 min", "hace 5 min", "hace 8 min", "hace 12 min"]);
  });
});