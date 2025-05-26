import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export type ContextType = {
  prisma: PrismaClient,
  loaders: {
    userSubscribedTo: DataLoader<string, string[], string>
    subscribedToUser: DataLoader<string, string[], string>
    profiles: DataLoader<string, string[], string>
    posts: DataLoader<string, string[], string>
    memberTypes: DataLoader<string, string[], string>
  }
}

export type GeneralArgs = { id: string }

export type GeneralObj = { id: string }

export type CreateArgs<T> = { dto: T }

export type UpdateArgs<T> = { id: string, dto: T }