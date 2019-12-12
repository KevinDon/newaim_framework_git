import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import Mock from 'mockjs';

const Random = Mock.Random;
const gqlTypeDefs = `
scalar Date

type User{
  _id:String
  id:String
  username:String
  password:String
  date_joined:String
}

type Query{
  getRandomUser:User
}

`;

const min = 100;
const max = 99999;
const mocks = {
    Int: () => Random.natural(min, max),
    Float: () => Random.float(min, max),
    String: () => Random.ctitle(10, 5),
    Date: () => Random.time(),
    User: () => (
        {
            id: Random.natural(min, max),
            name: Random.cname(),
            password: Random.city(),
            date_joined: Random.date()
        }
    )
};

const gqlTypeResolvers = {
    authUser: {
        __resolveType (data) {
            return data.typename;
        }
    }
};

const Schema = makeExecutableSchema({
    gqlTypeDefs,
    gqlTypeResolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

addMockFunctionsToSchema({ Schema, mocks, preserveResolvers: true });
