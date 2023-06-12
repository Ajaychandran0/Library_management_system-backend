export default function findByOverdueItems(memberId, returnedBookRepository) {
  return returnedBookRepository.findByOverdueItems(memberId);
}
