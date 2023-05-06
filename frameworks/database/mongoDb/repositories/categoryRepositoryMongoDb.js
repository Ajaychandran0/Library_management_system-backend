import CategoryModel from "../models/category.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function categoryRepositoryMongoDB() {
  const findByProperty = (params) => CategoryModel.find(omit(params, "page", "perPage"))
    .skip(params.perPage * (params.page - 1))
    .limit(params.perPage);

  const countAll = (params) => CategoryModel.countDocuments(omit(params, "page", "perPage"));

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

  return {
    findByProperty,
    countAll,
    findById,
    add
  };
}
