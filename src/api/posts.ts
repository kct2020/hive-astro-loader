import { hive } from "~/api/common";
import { adaptPost } from "~/adapters/posts.ts";
import type { Post } from "~/schema/posts.ts";

export async function getAccountPosts(author: string): Promise<Post[]> {
  return hive.hivemind
    .getAccountPosts({ account: author, sort: "posts" })
    .then((discussions) => {
      return discussions.map(adaptPost);
    });
}
