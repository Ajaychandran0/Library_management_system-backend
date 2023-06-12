export default function findByFilter(memberId, params, returnedBookRepository) {
  return returnedBookRepository.findByFilter(memberId, params);
}
