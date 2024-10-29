import { faker } from "@faker-js/faker";
import type { Discussion } from "@hiveio/dhive";

export function fakeDiscussion(): Discussion {
  return {
    abs_rshares: "",
    active: "",
    active_votes: [],
    allow_curation_rewards: false,
    allow_replies: false,
    allow_votes: false,
    author: faker.internet.username(),
    author_reputation: 0,
    author_rewards: "",
    beneficiaries: [],
    body: faker.lorem.paragraphs(2),
    body_length: "",
    cashout_time: "",
    category: faker.lorem.word(),
    children: 0,
    children_abs_rshares: "",
    created: "",
    curator_payout_value: "",
    depth: 0,
    post_id: faker.number.int(),
    // @ts-expect-error It actually comes in as an object, not string
    json_metadata: {
      app: faker.internet.jwt(),
      description: faker.lorem.sentences(2),
      format: "markdown+html",
      tags: faker.lorem.words(5).split(" "),
      image: faker.helpers.multiple(() => faker.image.url(), {
        count: { min: 0, max: 5 }
      })
    },
    last_payout: "",
    last_update: "",
    max_accepted_payout: "",
    max_cashout_time: "",
    net_rshares: "",
    net_votes: 0,
    parent_author: "",
    parent_permlink: "",
    pending_payout_value: "",
    percent_hbd: 0,
    permlink: faker.internet.url(),
    promoted: "",
    reblogged_by: [],
    replies: [],
    reward_weight: 0,
    root_comment: 0,
    root_title: "",
    title: faker.lorem.words(5),
    total_payout_value: "",
    total_pending_payout_value: "",
    total_vote_weight: 0,
    url: faker.internet.url(),
    vote_rshares: "",
    community: `hive-${faker.number.int()}`,
    community_title: faker.lorem.words(2)
  };
}

// export function fakePost(): Post {
//   const created = faker.date.past();
//
//   return {
//     id: faker.number.int().toString(),
//     canonical: faker.internet.url(),
//     category: faker.lorem.word(),
//     content: faker.lorem.paragraphs(2),
//     created: created,
//     updated: faker.date.past({ refDate: created }),
//     description: faker.lorem.sentences(2),
//     meta: { app: faker.internet.jwt(), format: "markdown+html" },
//     tags: faker.lorem.words(5).split(" "),
//     title: faker.lorem.words(5),
//     author: faker.internet.username(),
//     image: faker.image.url()
//   };
// }
