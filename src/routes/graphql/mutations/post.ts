import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { Post } from "../types/post.js";
import { UUIDType } from "../types/uuid.js";
import { createPost, deletePost, updatePost } from "../actions/post.js";

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType)  }
  }
})

const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
})

export const CreatePost = {
  type: Post,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) }
  },
  resolve: createPost
}

export const DeletePost = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: deletePost
}

export const UpdatePost = {
  type: Post,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangePostInput) }
  },
  resolve: updatePost
}