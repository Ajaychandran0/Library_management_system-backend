export default function updateFineStatus({
  overdueId,
  returnedBookRepository
}) {
  return returnedBookRepository.updateById(overdueId, { isFinePaid: true });
}
