import { ContextType, CreateArgs, GeneralArgs, GeneralObj, UpdateArgs } from "../types/general.js"

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

  if (isNaN(balance) || balance < 0) throw new Error(`Balance should be greater or equal 0: ${balance}`)
  
  return await context.prisma.user.create({
    data: { name, balance }
  })
}

export const deleteUser = async (obj, args: GeneralArgs, context: ContextType) => {
  try {
    await context.prisma.subscribersOnAuthors.deleteMany({
      where: {
        OR: [
          { subscriberId: args.id },
          { authorId: args.id }
        ]
      }
    })
    await context.prisma.post.deleteMany({
      where: { authorId: args.id }
    })
    await context.prisma.profile.deleteMany({
      where: { userId: args.id }
    })
    await context.prisma.user.delete({
      where: { id: args.id }
    })
    return null
  } catch {
    return null
  }
}

type ChangeUserInput = CreateUserInput

export const updateUser = async (obj, args: UpdateArgs<ChangeUserInput>, context: ContextType) => {
  const name = args.dto.name?.trim()
  const balance = args.dto.balance

  if (typeof balance !== 'undefined' && (isNaN(balance) || balance < 0)) throw new Error(`Balance should be greater or equal 0: ${balance}`)
  
  return await context.prisma.user.update({
    where: { id: args.id },
    data: { name, balance }
  })
}

type SubscriptionUserArgs = {
  userId: string
  authorId: string
}

export const subscribeUser = async (obj, args: SubscriptionUserArgs, context: ContextType) => {
  await context.prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: args.userId,
      authorId: args.authorId
    }
  })
  return null
}

export const unsubscribeUser = async (obj, args: SubscriptionUserArgs, context: ContextType) => {
  await context.prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: args.userId,
        authorId: args.authorId
      }
    }
  })
  return null
}