export default function paymentService(service) {
  const doPayment = (fineDetails) => service.doPayment(fineDetails);

  return {
    doPayment
  };
}
