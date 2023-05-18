export default function bookRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const findByEmail = (email) => repository.findByEmail(email);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const block = (id) => repository.block(id);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (id, updatedBook) => repository.updateById(id, updatedBook);

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add,
    block,
    deleteById,
    updateById
  };
}
