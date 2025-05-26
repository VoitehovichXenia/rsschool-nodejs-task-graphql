import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql"
import { UUIDType } from "../types/uuid.js"
import { MemberTypeId } from "../types/member.js"
import { Profile } from "../types/profile.js"
import { createProfile, updateProfile } from "../actions/profile.js"
import { deleteUser } from "../actions/user.js"

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) }
  }
})

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId }
  }
})

export const CreateProfile = {
  type: Profile,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) }
  },
  resolve: createProfile
}

export const DeleteProfile = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: deleteUser
}

export const UpdateProfile = {
  type: Profile,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) }
  },
  resolve: updateProfile
}