import { ContextType, GeneralArgs } from "../types/general.js"

type MemberTypeObj = { memberTypeId: string }

export const getProfileMemberType = async (obj: MemberTypeObj, args, context: ContextType) => {
  if (!obj.memberTypeId) return null
  return await context.prisma.memberType.findUnique({
    where: { id: obj.memberTypeId }
  })
}

export const getAllProfiles = async (obj, args, context: ContextType) => {
  return await context.prisma.profile.findMany()
}

export const getProfileById = async (obj, args: GeneralArgs, context: ContextType) => {
    if (!args.id) return null
    return await context.prisma.profile.findUnique({
      where: { id: args.id }
    })
  }