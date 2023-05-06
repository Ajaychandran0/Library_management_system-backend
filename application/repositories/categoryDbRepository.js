export default function categoryRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (category) => repository.add(category);
  const block = (id) => repository.block(id);
  const deleteById = (id) => repository.delete(id);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    block,
    deleteById
  };
}
