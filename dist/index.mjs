// src/api/common.ts
import { Client } from "@hiveio/dhive";
var HIVE_API = "https://api.hive.blog";
var HIVEKINGS_API = "https://api.hivekings.com";
var ANYX_API = "https://anyx.io";
var OPENHIVE_API = "https://api.openhive.network";
var APIS = [HIVE_API, HIVEKINGS_API, ANYX_API, OPENHIVE_API];
var hive = new Client(APIS);

// src/adapters/posts.ts
function adaptPost(post) {
  return {
    id: post.post_id.toString(),
    author: post.author,
    title: post.title,
    description: post.json_metadata.description,
    created: new Date(post.created),
    updated: post.updated ? new Date(post.updated) : void 0,
    community: post?.community ? { id: post.community, name: post.community_title } : void 0,
    category: post.category,
    tags: post.json_metadata.tags,
    image: post.json_metadata.image?.length ? post.json_metadata.image[0] : void 0,
    canonical: post.url,
    content: post.body,
    meta: {
      app: post.json_metadata.app,
      format: post.json_metadata.format
    }
  };
}

// src/api/posts.ts
async function getAccountPosts(author) {
  return hive.hivemind.getAccountPosts({ account: author, sort: "posts" }).then((discussions) => {
    return discussions.map(adaptPost);
  });
}

// src/schema/utils.ts
import { z } from "astro/zod";

// src/schema/accounts.ts
var Money = class {
  currency;
  amount;
  precision;
  constructor(currency, amount, precision) {
    this.currency = currency;
    this.amount = parseFloat(amount).toFixed(precision).toString();
    this.precision = precision;
  }
  asFloat() {
    return parseFloat(this.amount);
  }
};

// src/schema/utils.ts
function typeToZ() {
  return z.custom(() => true);
}
function balanceToMoney(balance, precision) {
  const [amount, currency] = balance.split(" ");
  if (!amount || !currency) {
    throw new Error(`Invalid balance: ${balance}`);
  }
  return new Money(currency, amount, precision);
}
var vestsToHive = (vests, params) => {
  const [v] = vests.split(" ");
  const [totalFund] = params.total_vesting_fund_hive.split(" ");
  const [totalShares] = params.total_vesting_shares.split(" ");
  const hive2 = parseFloat(v) * parseFloat(totalFund) / parseFloat(totalShares);
  return new Money("HIVE", hive2.toString(), 3);
};

// src/loaders/blogLoader.ts
function hiveBlogLoader(author) {
  return {
    name: "hive-blog-loader",
    load: async function({ store, logger }) {
      logger.debug(`Fetching blog posts [author: ${author}]`);
      const data = await getAccountPosts(author);
      store.clear();
      data.forEach((post) => {
        store.set({
          id: post.id.toString(),
          data: { ...post }
        });
      });
    },
    schema: typeToZ
  };
}

// src/adapters/accounts.ts
var adaptAccount = (account, params) => {
  const jsonMetadata = JSON.parse(account.posting_json_metadata);
  return {
    id: account.id.toString(),
    name: account.name,
    created: new Date(account.created),
    wallet: {
      hive: {
        liquid: balanceToMoney(account.balance, 3),
        frozen: vestsToHive(account.vesting_shares, params)
      },
      hbd: {
        liquid: balanceToMoney(account.hbd_balance, 3),
        frozen: balanceToMoney(account.savings_hbd_balance, 3)
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

// src/api/accounts.ts
async function getAccounts(usernames) {
  const params = await hive.database.getDynamicGlobalProperties();
  const accounts = await hive.database.getAccounts(usernames);
  return accounts.map((acc) => adaptAccount(acc, params));
}

// src/loaders/accountsLoader.ts
function hiveAccountsLoader(username) {
  return {
    name: "hive-accounts-loader",
    load: async function({ store, logger }) {
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
    schema: typeToZ
  };
}
export {
  hiveAccountsLoader,
  hiveBlogLoader
};
//# sourceMappingURL=index.mjs.map