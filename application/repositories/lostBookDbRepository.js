export default function lostBookRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteByProperty = (params) => repository.deleteByProperty(params);
  const updateLostQty = (bookId, qty) => repository.updateLostQty(bookId, qty);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteByProperty,
    updateLostQty
  };
}
