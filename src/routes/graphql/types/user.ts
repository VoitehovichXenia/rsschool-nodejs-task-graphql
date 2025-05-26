import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { UUIDType } from "./uuid.js"
import { Profile } from "./profile.js"
import { Posts } from "./post.js"
import { getSubscribedToUser, getUserPosts, getUserProfile, getUserSubscribedTo } from "../actions/user.js"

export const User: GraphQLObjectType = new GraphQLObjectType({
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

export const Users = new GraphQLList(User)