export default function updateBook(id, updatedBook, bookRepository) {
  updatedBook.updatedAt = new Date();
  return bookRepository.updateById(id, updatedBook);
}
