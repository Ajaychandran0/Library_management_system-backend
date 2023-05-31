export default function issuedBookRepository(repository) {
  const find = (params) => repository.find(params);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteByBookId = (id) => repository.deleteByBookId(id);
  const findByMember = (params) => repository.findByMember(params);

  return {
    find,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByBookId,
    findByMember
  };
}
