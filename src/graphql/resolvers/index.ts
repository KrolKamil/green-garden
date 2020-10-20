import { Resolvers } from "../types";
import { CommandBus, QueryBus } from "../../shared";
// QUERY_IMPORTS
// MUTATION_IMPORTS

export type MutationContext = {
  commandBus: CommandBus;
};

export type QueryContext = {
  queryBus: QueryBus;
};

interface ResolversDependencies { }

export const createResolvers = (_dependencies: ResolversDependencies): Resolvers => {
  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      // GRAPHQL_QUERIES
    },
    Mutation: {
      // GRAPHQL_MUTATIONS
    },
  };

  return resolvers;
};
