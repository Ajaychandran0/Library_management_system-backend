export default function issuedBookRepository(repository) {
  const find = (params) => repository.find(params);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteByProperty = (params) => repository.deleteByProperty(params);
  const findByMember = (params) => repository.findByMember(params);

  return {
    find,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByProperty,
    findByMember
  };
}
