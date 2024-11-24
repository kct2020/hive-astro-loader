import { hive } from "~/api/common";
import type { Account } from "~/schema/accounts.ts";
import { adaptAccount } from "~/adapters/accounts.ts";

export async function getAccounts(usernames: string[]): Promise<Account[]> {
  const params = await hive.database.getDynamicGlobalProperties();
  const accounts = await hive.database.getAccounts(usernames);
  return accounts.map((acc) => adaptAccount(acc, params));
}
