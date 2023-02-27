/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Feb 27 2023 19:26:54 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}
