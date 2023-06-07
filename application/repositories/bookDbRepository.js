export default function bookRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (id, updatedBook) => repository.updateById(id, updatedBook);
  const updateNetQty = (id, qty) => repository.updateNetQty(id, qty);
  const findByFilter = (params) => repository.findByFilter(params);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
    updateById,
    updateNetQty,
    findByFilter
  };
}
