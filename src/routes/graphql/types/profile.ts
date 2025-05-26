import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql"
import { UUIDType } from "./uuid.js"
import { MemberType } from "./member.js"
import { getAllProfiles, getProfileById, getProfileMemberType } from "../loaders/profile.js"

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

const Profiles = new GraphQLList(Profile)

export const ProfilesSchema = {
  type: Profiles,
  resolve: getAllProfiles
}

export const ProfileSchema = {
  type: Profile,
  args: {
    id: { type: UUIDType }
  },
  resolve: getProfileById
}