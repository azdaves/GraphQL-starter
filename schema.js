const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Hard Code Data

const customers = [
  {
    id: "1",
    name: "Dave Smith",
    email: "dave@gmail.com",
    age: 43,
    active: true
  },
  { id: "1", name: "Deb Small", email: "deb@gmail.com", age: 33, active: true },
  {
    id: "1",
    name: "Sara Jones",
    email: "sara@gmail.com",
    age: 53,
    active: false
  }
];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    active: { type: GraphQLBoolean }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
  customer: {
    type: CustomerType,
    args: {
      id: { type: GraphQLString }
    },
    resolve(parentValue, args) {
      for (let i = 0; i < customers.length; i++) {
        if (customers[i].id == args.id) {
          return customers[i];
        }
      }
    }
  },
  customers: {
  type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers;
      }
  }
}
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
