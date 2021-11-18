import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.ENDPOINT;
const token = process.env.TOKEN;

const graphQLClient = new GraphQLClient(endpoint);
graphQLClient.setHeader('authorization', token);

export { graphQLClient };
