import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { UUIDType } from "./uuid.js"

export type PostData = {
  id: string
  title: string
  content: string
}

export const Post = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
})

export const Posts = new GraphQLList(Post)