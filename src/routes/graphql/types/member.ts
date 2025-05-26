import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql"
import { getAllMemberTypes, getMemberTypeById } from "../loaders/member.js"

const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    'BASIC': { value: 'BASIC' },
    'BUISNESS': { value: 'BUISNESS' }
  }
})

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt }
  }
})

export const MemberTypes = new GraphQLList(MemberType)

export const MemberTypesSchema = {
  type: MemberTypes,
  resolve: getAllMemberTypes
}

export const MemberTypeSchema = {
  type: MemberType,
  args: {
    id: { type: MemberTypeId }
  },
  resolve: getMemberTypeById
}