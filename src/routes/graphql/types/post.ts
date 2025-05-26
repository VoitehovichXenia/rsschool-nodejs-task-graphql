import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { UUIDType } from "./uuid.js"
import { getAllPosts, getPostById } from "../loaders/post.js"

const Post = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
})

export const Posts = new GraphQLList(Post)

export const PostsSchema = {
  type: Posts,
  resolve: getAllPosts
}

export const PostSchema = {
  type: Post,
  args: {
    id: { type: UUIDType }
  },
  resolve: getPostById
}