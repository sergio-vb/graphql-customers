const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Hardcoded data
const customers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        age: 35
    },
    {
        id: '2',
        name: 'Steve Smith',
        email: 'steves@gmail.com',
        age: 25
    },
    {
        id: '3',
        name: 'Sarah Williams',
        email: 'sarahw@gmail.com',
        age: 22
    }
];




//Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

//Root query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        customer:{
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return customers.filter(x => x.id === args.id)[0];
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            args: {},
            resolve(parentValue, args){
                return customers;
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});