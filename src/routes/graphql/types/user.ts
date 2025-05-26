import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { UUIDType } from "./uuid.js"
import { Profile } from "./profile.js"
import { Posts } from "./post.js"
import { getAllUsers, getSubscribedToUser, getUserById, getUserPosts, getUserProfile, getUserSubscribedTo } from "../loaders/user.js"

const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: Profile,
      resolve: getUserProfile
    },
    posts: {
      type: Posts,
      resolve: getUserPosts
    },
    userSubscribedTo: { type: new GraphQLList(User), resolve: getUserSubscribedTo },
    subscribedToUser: { type: new GraphQLList(User), resolve: getSubscribedToUser },
  })
})

const Users = new GraphQLList(User)

export const UsersSchema = {
  type: Users,
  resolve: getAllUsers
}

export const UserSchema = {
  type: User,
  args: {
    id: { type: UUIDType }
  },
  resolve: getUserById
}