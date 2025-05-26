import { GraphQLNonNull } from 'graphql'
import { getAllUsers, getUserById } from "../actions/user.js"
import { User, Users } from "../types/user.js"
import { UUIDType } from "../types/uuid.js"

export const UsersQuery = {
  type: Users,
  resolve: getAllUsers
}

export const UserQuery = {
  type: User,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: getUserById
}