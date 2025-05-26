import { ContextType } from "../types/general.js"
import { MemberId } from "../types/member.js"

type MemberTypeSchemaArgs = { id: MemberId }

export const getAllMemberTypes = async (obj, args, context: ContextType) => {
  return await context.prisma.memberType.findMany()
}

export const getMemberTypeById = async (obj, args: MemberTypeSchemaArgs, context: ContextType) => {
  if (!args.id) return null
  return await context.prisma.memberType.findUnique({
    where: { id: args.id }
  })
}