export default function reqBookRepository(repository) {
  const getWishlist = (memberId) => repository.getWishlist(memberId);
  const getWishlistIds = (memberId) => repository.getWishlistIds(memberId);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (book) => repository.add(book);
  const deleteById = (id) => repository.deleteById(id);

  return {
    getWishlist,
    getWishlistIds,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById
  };
}
