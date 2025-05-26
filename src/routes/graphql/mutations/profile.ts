import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql"
import { UUIDType } from "../types/uuid.js"
import { MemberTypeId } from "../types/member.js"
import { User } from "../types/user.js"
import { createProfile } from "../actions/profile.js"

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt)},
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) }
  }
})

export const CreateProfile = {
  type: User,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) }
  },
  resolve: createProfile
}