import type { Communities } from "~/schema/communities.ts";

export type Post = {
  id: string;
  author: string;
  title: string;
  description: string;
  created: Date;
  updated?: Date;
  community?: Communities;
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
