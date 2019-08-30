const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
require("../models/index");
const UserType = require("./types/user_type")
const User = mongoose.model("users")
const AuthService = require("../services/auth")
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // newCategory: {
    //   type: CategoryType,
    //   args: {
    //     name: { type: GraphQLString }

    //   },
    //   resolve(parentValue, { name, products }) {
    //     return new Category({ name, products }).save();
    //   }
    // },
    // deleteCategory: {
    //   type: CategoryType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Category.remove({ _id: id });
    //   }
    // },
    // newProduct: {
    //   type: ProductType,
    //   args: {
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     weight: { type: GraphQLInt },
    //   },
    //   async resolve(_, { name, description, weight }, ctx) { //making new product a protected mutation
    //     const validUser = await AuthService.verifyUser({ token: ctx.token });

    //     // if our service returns true then our product is good to save!
    //     // anything else and we'll throw an error
    //     if (validUser.loggedIn) {
    //       return new Product({ name, description, weight }).save();
    //     } else {
    //       throw new Error('Sorry, you need to be logged in to create a product.');
    //     }
    //   }
    // },
    // deleteProduct: {
    //   type: ProductType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Product.remove({ _id: id });
    //   }
    // },
    // updateProduct: {
    //   type: ProductType,
    //   args: {
    //     productID: { type: GraphQLID },
    //     categoryID: { type: GraphQLID }
    //   },
    //   resolve(parentValue, { productID, categoryID }) {
    //     return Product.updateProductCategory(productID, categoryID);
    //   }
    // },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;


