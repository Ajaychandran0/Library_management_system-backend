import CategoryModel from "../models/category.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function categoryRepositoryMongoDB() {
  const findByProperty = (params) => CategoryModel.find(omit(params, "page", "pageSize"))
    .skip(params.pageSize * params.page)
    .limit(params.pageSize);

  const countAll = (params) => CategoryModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => CategoryModel.findById(id);

  const add = (category) => {
    const newCategory = new CategoryModel({
      name: category.getName(),
      description: category.getDescription(),
      imageUrl: category.getImageUrl(),
      createdAt: category.getCreatedAt()
    });

    return newCategory.save();
  };

  const deleteById = (id) => CategoryModel.deleteOne({ _id: id });

  const updateById = (id, updatedCat) => CategoryModel.updateOne({ _id: id }, updatedCat);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
    updateById
  };
}
