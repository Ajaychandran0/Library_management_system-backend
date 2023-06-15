import doOverduePayment from "../../application/use_cases/payment/doOverduePayment.js";
import updateFineStatus from "../../application/use_cases/payment/updateFineStatus.js";

export default function paymentController({
  returnedBookRepository,
  // lostBookRepository,
  paymentService
}) {
  const handleOverduePayment = (req, res) => {
    const { overdueItemId } = req.body;

    doOverduePayment({ paymentService, overdueItemId, returnedBookRepository })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  const updateOverduePaymentStatus = (req, res) => {
    const { overdueId } = req.body;
    updateFineStatus({ overdueId, returnedBookRepository })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  // const handleLostBookPayment = (req, res) => {
  //   const lostItemId = req.body;
  //   doOverduePayment({ paymentService, lostItemId, lostBookRepository });
  // };

  return {
    handleOverduePayment,
    updateOverduePaymentStatus
    // handleLostBookPayment
  };
}
