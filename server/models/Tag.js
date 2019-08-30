const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks"
    }
  ]
});

TagSchema.statics.FindTasks = tagId => {
  const Task = mongoose.model("tasks");
  const List = mongoose.model("tags");
  return Task.findById(tagId).tasks;
};

module.exports = mongoose.model("tags", TagSchema);


// tag: {
//     0: {
//         tag_name:,
//             tag_id:,
//         tasks: [
//             task1: {}
//         ]
//     }
// }
// ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
//     const Product = mongoose.model("products");
//     const Category = mongoose.model("categories");

//     return Product.findById(productId).then(product => {
//         // if the product already had a category
//         if (product.category) {
//             // find the old category and remove this product from it's products
//             Category.findById(product.category).then(oldcategory => {
//                 oldcategory.products.pull(product);
//                 return oldcategory.save();
//             });
//         }
//         //  find the Category and push this product in, as well as set this product's category
//         return Category.findById(categoryId).then(newCategory => {
//             product.category = newCategory;
//             newCategory.products.push(product);

//             return Promise.all([product.save(), newCategory.save()]).then(
//                 ([product, newCategory]) => product
//             );
//         });
//     });
// };