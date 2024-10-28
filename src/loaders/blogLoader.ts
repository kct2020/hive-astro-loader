import type { Loader } from "astro/loaders";
import { getAccountPosts } from "~/api/posts.ts";
import { typeToZ } from "~/schema/utils.ts";
import type { Post } from "~/schema/posts.ts";

export function hiveBlogLoader(author: string): Loader {
  return {
    name: "hive-blog-loader",
    load: async function (this: Loader, { store, logger }) {
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
    schema: typeToZ<Post[]>
  };
}
