import depthLimit from 'graphql-depth-limit';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, parse, validate, specifiedRules, ValidationRule } from 'graphql';

import { PostQuery, PostsQuery } from './queries/post.js';
import { UserQuery, UsersQuery } from './queries/user.js';
import { ProfileQuery, ProfilesQuery } from './queries/profile.js';
import { MemberTypesQuery, MemberTypeQuery } from './queries/member.js';

import { CreateUser, DeleteUser, SubscribeUser, UnubscribeUser, UpdateUser } from './mutations/user.js';
import { CreatePost, DeletePost, UpdatePost } from './mutations/post.js';
import { CreateProfile, DeleteProfile, UpdateProfile } from './mutations/profile.js';

import { getLoaders } from './loaders/getLoaders.js';

const MAX_REQ_DEPTH = 5

const schema: GraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      // Get all resources
      memberTypes: MemberTypesQuery,
      posts: PostsQuery,
      users: UsersQuery,
      profiles: ProfilesQuery,
      // Get resources by id
      memberType: MemberTypeQuery,
      post: PostQuery,
      profile: ProfileQuery,
      user: UserQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createPost: CreatePost,
      createUser: CreateUser,
      createProfile: CreateProfile,
      deletePost: DeletePost,
      deleteProfile: DeleteProfile,
      deleteUser: DeleteUser,
      changePost: UpdatePost,
      changeProfile: UpdateProfile,
      changeUser: UpdateUser,
      subscribeTo: SubscribeUser,
      unsubscribeFrom: UnubscribeUser
    },
  })
})

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, res) {
      const parsedQuery = parse(req.body.query)
      const depthRule = depthLimit(MAX_REQ_DEPTH) as ValidationRule
      const errors = validate(schema, parsedQuery, [
        depthRule,
        ...specifiedRules
      ])
      
      if (errors.length) {
        return res.code(200).send({ errors });
      }
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          prisma,
          loaders: getLoaders(prisma)
        },
      });
    },
  });
};

export default plugin;
