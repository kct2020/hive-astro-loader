import { describe, expect, test } from "bun:test";

import { adaptPost } from "~/adapters/posts.ts";
import { fakeDiscussion } from "~/tests/mocks.ts";

describe("adaptPost", () => {
  test("should return the first image from the post", () => {
    const discussion = fakeDiscussion();
    const post = adaptPost(discussion);

    expect(post.image).toBe(discussion.json_metadata?.image[0]);
    expect(post.community?.id).toBe(discussion.community);
    expect(post.community?.name).toBe(discussion.community_title);
  });
});
