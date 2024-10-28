import type { Community } from "~/schema/community.ts";

export type Post = {
  id: string;
  author: string;
  title: string;
  description: string;
  created: Date;
  updated?: Date;
  community?: Community;
  category: string;
  tags: string[];
  image?: string;
  canonical: string;
  content: string;
  meta: {
    app: string;
    format: string;
  };
};
