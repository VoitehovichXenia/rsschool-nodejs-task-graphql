import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql"
import { UUIDType } from "./uuid.js"
import { MemberType } from "./member.js"
import { getProfileMemberType } from "../actions/profile.js"

export const Profile = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      resolve: getProfileMemberType
    }
  }
})

export const Profiles = new GraphQLList(Profile)