import { ContextType, CreateArgs, GeneralArgs, UpdateArgs } from "../types/general.js"

export const getAllPosts = async (obj, args, context: ContextType) => {
  return await context.prisma.post.findMany()
}

export const getPostById = async (obj, args: GeneralArgs, context: ContextType) => {
  if (!args.id) return null
  return await context.prisma.post.findUnique({
    where: { id: args.id }
  })
}

type CreatePostInput = {
  title: string
  content: string
  authorId: string
}

export const createPost = async (obj, args: CreateArgs<CreatePostInput>, context: ContextType) => {
  const title = args.dto.title?.trim()
  const content = args.dto.content?.trim()
  const authorId = args.dto.authorId
  if (!title) throw new Error(`title must be a non empty string: ${title}`)
  if (!content) throw new Error(`content must be a non empty string: ${content}`)

  return await context.prisma.post.create({
    data: { title, content, authorId },
  })
}

export const deletePost = async (obj, args: GeneralArgs, context: ContextType) => { 
  await context.prisma.post.delete({
    where: { id: args.id }
  })
  return null
}

type ChangePostInput = Omit<CreatePostInput, 'authorId'>

export const updatePost = async (obj, args: UpdateArgs<ChangePostInput>, context: ContextType) => { 
  const { title: coreTitle, content: coreContent } = args.dto
  const title = coreTitle?.trim()
  const content = coreContent?.trim()
  if (coreTitle && !title) throw new Error(`title must be a non empty string: ${title}`)
  if (coreContent && !content) throw new Error(`content must be a non empty string: ${content}`)

  return await context.prisma.post.update({
    where: { id: args.id },
    data: { title, content }
  })
}