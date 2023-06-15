import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

export default function paymentService() {
  const doPayment = async (fineDetails) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: fineDetails[0].book.bookTitle,
              metadata: {
                bookId: fineDetails[0].book.toString(),
                issueDate: fineDetails[0].issueDate,
                returnDate: fineDetails[0].returnDate,
                returnedOn: fineDetails[0].returnedOn
              }
            },
            unit_amount: fineDetails[0].fine * 100
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_STRIPE_URL}?success=true&overdueId=${fineDetails[0]._id}`,
      cancel_url: `${process.env.CLIENT_STRIPE_URL}?canceled=true`
    });
    return { paymentUrl: session.url, sessionId: session.id };
  };

  return {
    doPayment
  };
}
