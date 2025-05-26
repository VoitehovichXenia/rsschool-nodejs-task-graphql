import { ContextType, CreateArgs, GeneralArgs, UpdateArgs } from "../types/general.js"
import { MemberId } from "../types/member.js"

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

type CreateProfileInput = {
  isMale: boolean
  yearOfBirth: number
  userId: string
  memberTypeId: MemberId
}

export const createProfile = async (obj, args: CreateArgs<CreateProfileInput>, context: ContextType) => {
  const { isMale, yearOfBirth, userId, memberTypeId } = args.dto

  if (isNaN(yearOfBirth) || yearOfBirth < 0) throw new Error(`Year of birth must be greater than 0: ${yearOfBirth}`)

  return await context.prisma.profile.create({
    data: { isMale, yearOfBirth, userId, memberTypeId }
  })
}

export const deleteProfile = async (obj, args: GeneralArgs, context: ContextType) => {
  await context.prisma.profile.delete({
    where: { id: args.id }
  })
  return null
}

type ChangeProfileInput = Omit<CreateProfileInput, 'userId'>

export const updateProfile = async (obj, args: UpdateArgs<ChangeProfileInput>, context: ContextType) => {
  const { isMale, yearOfBirth, memberTypeId } = args.dto

  if (typeof yearOfBirth !== 'undefined' && (isNaN(yearOfBirth) || yearOfBirth < 0)) throw new Error(`Year of birth must be greater than 0: ${yearOfBirth}`)

  return await context.prisma.profile.update({
    where: { id: args.id },
    data: { isMale, yearOfBirth, memberTypeId }
  })
}