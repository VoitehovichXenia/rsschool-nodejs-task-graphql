import { PrismaClient } from "@prisma/client";

export type ContextType = { prisma: PrismaClient }

export type GeneralArgs = { id: string }

export type GeneralObj = { id: string }