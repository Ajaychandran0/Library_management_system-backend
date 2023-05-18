export default function updateBook(id, updatedBook, bookRepository) {
  return bookRepository.updateById(id, updatedBook);
}
