import { ContextType, GeneralArgs } from "../types/general.js"

export const getAllPosts = async (obj, args, context: ContextType) => {
  return await context.prisma.post.findMany()
}

export const getPostById = async (obj, args: GeneralArgs, context: ContextType) => {
  if (!args.id) return null
  return await context.prisma.post.findUnique({
    where: { id: args.id }
  })
}