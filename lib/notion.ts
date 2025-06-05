import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

if (!process.env.NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN environment variable");
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error("Missing NOTION_DATABASE_ID environment variable");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "publish",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return response.results;
}

export async function getPost(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    post: response,
    markdown: mdString,
  };
}

export async function getPostsByTag(tag: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "publish",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "tags",
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return response.results;
}