import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql"

export type MemberId = 'BUSINESS' | 'BASIC'

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    'BASIC': { value: 'BASIC' },
    'BUSINESS': { value: 'BUSINESS' }
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