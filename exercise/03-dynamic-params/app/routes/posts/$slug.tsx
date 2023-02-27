/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Feb 27 2023 19:00:38 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  // check if slug is present
  invariant(params.slug, "Missing slug!");
  // get post
  const post = await getPost(params.slug);
  // check if post exists
  invariant(post, "Post not found!");
  // parse markdown to html
  const html = marked(post.markdown);
  // return optimised json data (only what is needed)
  return json({
    title: post.title,
    html,
  });
};

export default function Post() {
  const { title, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
