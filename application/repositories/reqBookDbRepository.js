export default function reqBookRepository(repository) {
  const getAllReqBooks = (memberId) => repository.getAllReqBooks(memberId);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (requestedBook) => repository.add(requestedBook);
  const deleteById = (id) => repository.deleteById(id);

  return {
    getAllReqBooks,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById
  };
}
