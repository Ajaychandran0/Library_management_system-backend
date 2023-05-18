export default function updateCategory(id, updatedCat, categoryRepository) {
  return categoryRepository.updateById(id, updatedCat);
}
