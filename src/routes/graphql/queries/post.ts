import { GraphQLNonNull } from "graphql"
import { getAllPosts, getPostById } from "../actions/post.js"
import { Post, Posts } from "../types/post.js"
import { UUIDType } from "../types/uuid.js"

export const PostsQuery = {
  type: Posts,
  resolve: getAllPosts
}

export const PostQuery = {
  type: Post,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: getPostById
}