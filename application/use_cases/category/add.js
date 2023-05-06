import category from "../../../src/entities/category.js";

export default function addcategory(categoryDetails, categoryRepository) {
  const { name, description, image } = categoryDetails;

  const createdAt = new Date();
  const catName = name.toUpperCase();

  if (!name || !image) {
    const error = { message: "Input fields cannot be empty", statusCode: 400 };
    throw error;
  }

  const newCategory = category({
    name: catName,
    description,
    imageUrl: image,
    createdAt
  });

  return categoryRepository.findByProperty({ name: catName }).then((categoryExist) => {
    if (categoryExist.length) {
      const error = {
        message: ` Category '${name}' already exists`,
        statusCode: 500
      };
      throw error;
    }
    return categoryRepository.add(newCategory);
  });
}
