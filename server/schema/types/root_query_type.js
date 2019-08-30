// const axios = require("axios");
// const { AWS_KEY } = require('../../../config/keys')
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
require("../../models/index");

const UserType = require("./user_type");
const User = mongoose.model("users");

// const authOptions = {
//   method: "GET",
//   url:
//     "https://e12kjd8470.execute-api.us-east-2.amazonaws.com/default/generate-price",
//   headers: {
//     "x-api-key": AWS_KEY
//   }
// };

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    }
    // categories: {
    //   type: new GraphQLList(CategoryType),
    //   resolve() {
    //     return Category.find({});
    //   }
    // },
    // category: {
    //   type: CategoryType,
    //   args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    //   resolve(_, args) {
    //     return Category.findById(args._id);
    //   }
    // },

    //   products: {
    //     type: new GraphQLList(ProductType),
    //     resolve() {
    //       debugger
    //       let newProducts;
    //       return Product.find({})
    //         .then(products => { 
    //         // then fetch our price using the above options
    //        newProducts = products.map(product => {
    //           return axios(authOptions).then(res => {
    //             product.cost = res.data.cost;
    //             return product

    //             // set our cost onto the Product Object
    //             // then return the complete product object
    //             // return newProducts;
    //           })
    //       });
    //       return newProducts
    //     })
    //   }
    // },
    // 
    // products: {
    //   type: new GraphQLList(ProductType),
    //   resolve() {
    //     return Product.find({})
    //       .then(products => {
    //         const productsCost = products.map(prod => {
    //           return axios(authOptions).then(res => {
    //             prod.cost = res.data.cost;
    //             return prod;
    //           });
    //         });
    //         return productsCost
    //       })
    //   }
    // },

  //   product: {
  //     type: ProductType,
  //     args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
  //     resolve(_, args) {
  //       // find our product
  //       return Product.findById(args._id).then(product => {
  //         // then fetch our price using the above options
  //         return axios(authOptions).then(res => {
  //           // set our cost onto the Product Object
  //           product.cost = res.data.cost;
  //           // then return the complete product object
  //           return product;
  //         });
  //       });
  //     }
  //   }
  })
});

module.exports = RootQueryType;
