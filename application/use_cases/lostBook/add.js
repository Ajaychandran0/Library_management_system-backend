import lostBook from "../../../src/entities/lostBook.js";

export default function addLostBook({
  bookId,
  memberId,
  bookRepository,
  memberRepository,
  issuedBookRepository,
  lostBookRepository
}) {
  const lostBookDetails = {
    lostDate: new Date(),
    lostQty: 1,
    isfinePaid: false
  };
  return issuedBookRepository
    .find({ book: bookId, member: memberId })
    .then((issuedBook) => {
      if (!issuedBook.length) {
        const error = {
          message: "This book is not issued to this user",
          statusCode: 400
        };
        throw error;
      }
      return issuedBookRepository.deleteByProperty({
        book: bookId,
        member: memberId
      });
    })
    .then(() => bookRepository.findById(bookId))
    .then((book) => {
      if (!book) {
        const error = {
          message: "Book does not exist",
          statusCode: 400
        };
        throw error;
      }

      const bookDetails = {
        _id: book._id,
        bookTitle: book.bookTitle,
        ISBN: book.ISBN,
        language: book.language,
        category: book.category,
        author: book.author,
        price: book.price,
        lostPrice: book.lostPrice,
        bookCoverUrl: book.imageUrl,
        addedOn: book.createdAt
      };
      lostBookDetails.book = bookDetails;

      if (book.quantity > 1) {
        book.quantity -= 1;
        return book.save();
      }
      return bookRepository.deleteById(bookId);
    })
    .then(() => memberRepository.findById(memberId))
    .then((member) => {
      if (!member) {
        const error = {
          message: "Member does not exist",
          statusCode: 400
        };
        throw error;
      }
      const memberDetails = {
        _id: member._id,
        name: member.name,
        collegeId: member.collegeId,
        email: member.email,
        phone: member.phone,
        department: member.department,
        profilePic: member.profilePic,
        collegeIdCard: member.collegeIdCard,
        enrolledOn: member.createdAt,
        address: member.address
      };
      lostBookDetails.member = memberDetails;
      return lostBookRepository.findByProperty({ "book._id": bookId });
    })
    .then((book) => {
      if (book.length) {
        return lostBookRepository.updateLostQty(bookId, 1);
      }

      const newLostBook = lostBook(lostBookDetails);
      return lostBookRepository.add(newLostBook);
    });
}
