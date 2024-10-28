import { describe, test, expect } from "bun:test";
import { getAccountPosts } from "~/api/posts.ts";

describe("getAccountPosts", () => {
  test("returns discussions", async () => {
    const posts = await getAccountPosts("hive.coding");
    expect(posts).toBeArray();
    expect(posts.length).toBeGreaterThan(0);
    const firstPost = posts.pop();
    expect(firstPost?.author).toBe("hive.coding");
    expect(firstPost?.created).toBeInstanceOf(Date);
  });
});
