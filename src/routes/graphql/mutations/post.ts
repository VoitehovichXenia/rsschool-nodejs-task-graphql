import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { Post } from "../types/post.js";
import { UUIDType } from "../types/uuid.js";
import { createPost } from "../actions/post.js";

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString)  },
    authorId: { type: new GraphQLNonNull(UUIDType)  }
  }
})

export const CreatePost = {
  type: Post,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) }
  },
  resolve: createPost
}