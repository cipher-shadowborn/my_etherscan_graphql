const { ApolloServer } = require("apollo-server"); 
// Import ApolloServer from apollo-server

const { importSchema } = require("graphql-import");
// Import importSchema method to load GraphQL schemas

const EtherDataSource = require("./datasource/ethDatasource");
// Import custom EtherDataSource data source 

const typeDefs = importSchema("./schema.graphql");
// Load GraphQL schema from file

require("dotenv").config(); 
// Load environment variables from .env file

const resolvers = {
  Query: {
    // Define resolvers for Query type
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

server.timeout = 0; 

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
