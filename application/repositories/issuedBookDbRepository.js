export default function issuedBookRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteByBookId = (id) => repository.deleteByBookId(id);
  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteByBookId
  };
}
