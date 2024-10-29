import type { Discussion } from "@hiveio/dhive";
import type { Post } from "~/schema/posts.ts";

/**
 * Adapts dHive Discussion to our Post schema.
 * Unfortunately, data returned by dHive is different to Discussion type...
 */
export function adaptPost(post: Discussion): Post {
  return {
    id: post.post_id.toString(),
    author: post.author,
    title: post.title,
    description: post.json_metadata.description,
    created: new Date(post.created),
    updated: post.updated ? new Date(post.updated) : undefined,
    community: post?.community
      ? { id: post.community, name: post.community_title }
      : undefined,
    category: post.category,
    tags: post.json_metadata.tags,
    image: post.json_metadata.image?.length
      ? post.json_metadata.image[0]
      : undefined,
    canonical: post.url,
    content: post.body,
    meta: {
      app: post.json_metadata.app,
      format: post.json_metadata.format
    }
  };
}
