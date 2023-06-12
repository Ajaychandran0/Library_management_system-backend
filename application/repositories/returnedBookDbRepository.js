export default function returnedBookRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const findByMember = (params) => repository.findByMember(params);
  const findByFilter = (memberId, params) => repository.findByFilter(memberId, params);
  const findByOverdueItems = (memberId) => repository.findByOverdueItems(memberId);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    findByMember,
    findByFilter,
    findByOverdueItems
  };
}
