import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { User } from "../types/user.js";
import { createUser } from "../actions/user.js";

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) }
  }
})

export const CreateUser = {
  type: User,
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput)}
  },
  resolve: createUser
}