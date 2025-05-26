import { GraphQLNonNull } from "graphql"
import { getAllMemberTypes, getMemberTypeById } from "../actions/member.js"
import { MemberType, MemberTypeId, MemberTypes } from "../types/member.js"

export const MemberTypesQuery = {
  type: MemberTypes,
  resolve: getAllMemberTypes
}

export const MemberTypeQuery = {
  type: MemberType,
  args: {
    id: { type: new GraphQLNonNull(MemberTypeId) }
  },
  resolve: getMemberTypeById
}