export default function reqBookRepository(repository) {
  const getAllReqBooks = (memberId) => repository.getAllReqBooks(memberId);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (requestedBook) => repository.add(requestedBook);
  const deleteByProperty = (params) => repository.deleteByProperty(params);
  const getAllBookRequests = (params) => repository.getAllBookRequests(params);
  return {
    getAllReqBooks,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByProperty,
    getAllBookRequests
  };
}
