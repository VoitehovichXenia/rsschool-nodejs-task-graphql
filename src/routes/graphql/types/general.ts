import { PrismaClient } from "@prisma/client";

export type ContextType = { prisma: PrismaClient }

export type GeneralArgs = { id: string }

export type GeneralObj = { id: string }

export type CreateArgs<T> = { dto: T }

export type UpdateArgs<T> = { id: string, dto: T }