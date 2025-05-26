import { getAllUsers, getUserById } from "../actions/user.js"
import { Users } from "../types/user.js"
import { UUIDType } from "../types/uuid.js"

export const UsersQuery = {
  type: Users,
  resolve: getAllUsers
}

export const UserQuery = {
  type: Users,
  args: {
    id: { type: UUIDType }
  },
  resolve: getUserById
}