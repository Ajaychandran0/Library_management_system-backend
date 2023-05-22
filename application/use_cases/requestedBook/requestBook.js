import requestedBook from "../../../src/entities/requestedBook.js";

export default function requestbook(bookId, memberId, reqBookRepository) {
  const requestedDate = new Date();

  const newReqBook = requestedBook({
    book: bookId,
    member: memberId,
    requestedDate
  });

  return reqBookRepository
    .findByProperty({ book: bookId })
    .then((bookExist) => {
      if (bookExist.length) {
        const error = {
          message: "This book has been already requested",
          statusCode: 400
        };
        throw error;
      }
      return reqBookRepository.add(newReqBook);
    });
}
