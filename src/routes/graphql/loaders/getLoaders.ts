import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

import { UserData } from "../types/user.js";
import { PostData } from "../types/post.js";

export const getLoaders = (prisma: PrismaClient) => {
  return {
    userSubscribedTo: new DataLoader(
      async (ids: readonly string[]) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: { in: ids as string[] } },
          include: { author: true }
        });

        const groups = new Map<string, UserData[]>()
        for (const sub of subscriptions) {
          if (!groups.has(sub.subscriberId)) {
            groups.set(sub.subscriberId, [])
          }
          groups.get(sub.subscriberId)?.push(sub.author)
        }

        return ids.map(id => groups.get(id) || [])
      }
    ),

    subscribedToUser: new DataLoader(
      async (ids: readonly string[]) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: { in: ids as string[] } },
          include: { subscriber: true }
        });
        const groups = new Map<string, UserData[]>()
        for (const sub of subscribers) {
          if (!groups.has(sub.authorId)) {
            groups.set(sub.authorId, [])
          }
          groups.get(sub.authorId)?.push(sub.subscriber)
        }
        return ids.map(id => groups.get(id) || [])
      }
    ),

    profiles: new DataLoader(
      async (userIds: readonly string[]) => {
        const profiles = await prisma.profile.findMany({
          where: {
            userId: { in: userIds as string[] }
          }
        })

        const map = new Map(profiles.map(profile => [profile.userId, profile]))
        return userIds.map(userId => map.get(userId) || null)
      }
    ),

    posts: new DataLoader(
      async (userIds: readonly string[]) => {
        const posts = await prisma.post.findMany({
          where: {
            authorId: { in: userIds as string[] }
          }
        })
        const groups = new Map<string, PostData[]>()
        for (const post of posts) {
          if (!groups.has(post.authorId)) {
            groups.set(post.authorId, [])
          }
          groups.get(post.authorId)?.push(post)
        }

        return userIds.map(userId => groups.get(userId) || [])
      }
    ),

    memberTypes: new DataLoader(
      async (ids: readonly string[]) => {
        const memberTypes = await prisma.memberType.findMany({
          where: { id: { in: ids as string[] } }
        });

        const map = new Map(memberTypes.map(memberType => [memberType.id, memberType]));
        return ids.map(id => map.get(id) || null);
      }
    )
  };
}