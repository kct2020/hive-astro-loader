import type { Loader } from "astro/loaders";
import { typeToZ } from "~/schema/utils.ts";
import type { Account } from "~/schema/accounts.ts";
import { getAccounts } from "~/api/accounts.ts";

export function hiveAccountsLoader(username: string | string[]): Loader {
  return {
    name: "hive-accounts-loader",
    load: async function (this: Loader, { store, logger }) {
      logger.debug(`Fetching accounts [usernames: ${username}]`);
      const data = await getAccounts(
        Array.isArray(username) ? username : [username]
      );
      store.clear();
      data.forEach((account) => {
        store.set({
          id: account.id.toString(),
          data: { ...account }
        });
      });
    },
    schema: typeToZ<Account[]>
  };
}
