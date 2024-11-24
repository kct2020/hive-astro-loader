import { describe, test, expect } from "bun:test";
import { getAccounts } from "~/api/accounts.ts";

describe("getAccounts", () => {
  test("returns accounts", async () => {
    const accounts = await getAccounts(["hive.coding", "mciszczon"]);
    expect(accounts).toBeArray();
    expect(accounts.length).toEqual(2);
    const acc1 = accounts[0]!;
    expect(acc1.name).toEqual("hive.coding");
    const acc2 = accounts[1]!;
    expect(acc2.name).toEqual("mciszczon");
    expect(acc2.wallet.hive.liquid.asFloat()).toBeNumber();
    expect(acc2.wallet.hive.frozen.asFloat()).toBeNumber();
  });
});
