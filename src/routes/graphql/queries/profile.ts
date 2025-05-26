import { GraphQLNonNull } from "graphql"
import { getAllProfiles, getProfileById } from "../actions/profile.js"
import { Profile, Profiles } from "../types/profile.js"
import { UUIDType } from "../types/uuid.js"

export const ProfilesQuery = {
  type: Profiles,
  resolve: getAllProfiles
}

export const ProfileQuery = {
  type: Profile,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: getProfileById
}