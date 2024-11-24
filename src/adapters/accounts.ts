import type { DynamicGlobalProperties, ExtendedAccount } from "@hiveio/dhive";
import { type Account } from "~/schema/accounts.ts";
import { balanceToMoney, vestsToHive } from "~/schema/utils.ts";

const adaptAccount = (
  account: ExtendedAccount,
  params: DynamicGlobalProperties
): Account => {
  const jsonMetadata = JSON.parse(account.posting_json_metadata);

  return {
    id: account.id.toString(),
    name: account.name,
    created: new Date(account.created),
    wallet: {
      hive: {
        liquid: balanceToMoney(account.balance as string, 3)!,
        frozen: vestsToHive(account.vesting_shares as string, params)
      },
      hbd: {
        liquid: balanceToMoney(account.hbd_balance as string, 3)!,
        frozen: balanceToMoney(account.savings_hbd_balance as string, 3)!
      }
    },
    postCount: account.post_count,
    profile: {
      name: jsonMetadata.profile.name,
      about: jsonMetadata.profile.about,
      coverImage: jsonMetadata.profile.cover_image,
      profileImage: jsonMetadata.profile.profile_image,
      website: jsonMetadata.profile.website,
      location: jsonMetadata.profile.location
    }
  };
};

export { adaptAccount };
