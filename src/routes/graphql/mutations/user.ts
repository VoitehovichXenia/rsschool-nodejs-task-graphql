import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { User } from "../types/user.js";
import { createUser, deleteUser, subscribeUser, unsubscribeUser, updateUser } from "../actions/user.js";
import { UUIDType } from "../types/uuid.js";

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) }
  }
})

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  }
})

export const CreateUser = {
  type: User,
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput)}
  },
  resolve: createUser
}

export const DeleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType)}
  },
  resolve: deleteUser
}

export const UpdateUser = {
  type: User,
  args: {
    id: { type: new GraphQLNonNull(UUIDType)},
    dto: { type: new GraphQLNonNull(ChangeUserInput)}
  },
  resolve: updateUser
}

export const SubscribeUser = {
  type: GraphQLBoolean,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType)},
    authorId: { type: new GraphQLNonNull(UUIDType)}
  },
  resolve: subscribeUser
}

export const UnubscribeUser = {
  type: GraphQLBoolean,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType)},
    authorId: { type: new GraphQLNonNull(UUIDType)}
  },
  resolve: unsubscribeUser
}