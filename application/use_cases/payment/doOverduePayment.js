export default function doOverduePayment({
  paymentService,
  overdueItemId,
  returnedBookRepository
}) {
  return returnedBookRepository
    .findByMember({ _id: overdueItemId })
    .then((overdueItem) => paymentService.doPayment(overdueItem));
  // .then(() => returnedBookRepository.updateById(overdueItemId, { isFinePaid: true }));
}
