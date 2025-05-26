import { ContextType, CreateArgs, GeneralArgs, GeneralObj } from "../types/general.js"

export const getUserProfile = async (obj: GeneralObj, args, context: ContextType) => {
  if (!obj.id) return null
  return await context.prisma.profile.findUnique({
    where: {
      userId: obj.id
    }
  })
}

export const getUserPosts = async (obj: GeneralObj, args, context: ContextType) => {
  if (!obj.id) return null
  return await context.prisma.post.findMany({
    where: {
      authorId: obj.id
    }
  })
}

export const getUserSubscribedTo = async (obj: GeneralObj, args, context: ContextType) => {
  if (!obj.id) return null
  return await context.prisma.user.findMany({
    where: { subscribedToUser: { some: { subscriberId: obj.id }} }
  })
}

export const getSubscribedToUser = async (obj: GeneralObj, args, context: ContextType) => {
  if (!obj.id) return null
  return await context.prisma.user.findMany({
    where: { userSubscribedTo: { some: { authorId: obj.id }} }
  })
}

export const getAllUsers = async (obj, args, context: ContextType) => {
  return await context.prisma.user.findMany()
}

export const getUserById = async (obj, args: GeneralArgs, context: ContextType) => {
  if (!args.id) return null
  return await context.prisma.user.findUnique({
    where: { id: args.id }
  })
}

type CreateUserInput = {
  name: string
  balance: number
}

export const createUser = async (obj, args: CreateArgs<CreateUserInput>, context: ContextType) => {
  const name = args.dto.name?.trim()
  const balance = args.dto.balance

  if (isNaN(balance) || balance < 0) throw new Error(`Float cannot represent non-float value: ${balance}`)
  
  return await context.prisma.user.create({
    data: { name, balance }
  })
}