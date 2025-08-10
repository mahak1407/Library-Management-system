const Book = require("../model/book");
const Author = require("../model/author");

// Add Book
const addBook = async (req, res) => {
    const { book_id, title, genre, publication_year, author_id } = req.body;
    try {
        const existingBook = await Book.findOne({ BookId: book_id });
        if (existingBook) {
            return res.render('addBook', { message1: 'Book Already Exists', message2: '' });
        }
        const author = await Author.findOne({ AuthorId: author_id })
        console.log(author)
        if (!author) {
            return res.render('addBook', { message1: 'No such author exists', message2: '' });
        }
        const newBook = new Book({ BookId: book_id, Title: title, Genre: genre, Publication_Year: publication_year,  authId: author._id });
        await newBook.save();
        return res.render('addBook', { message1: '', message2: 'Added Successfully' });

    } catch (error) {
        console.error("Error adding book:", error);
        res.render('addBook', { message1: 'Please check the Field type', message2: '' });
    }
};

// Display Books
const displayBook = async (req, res) => {
    const { book_id, DisplayAll } = req.body;

    if (!book_id && !DisplayAll) {
        return res.render('displayBook', { message1: 'Please enter ID', message2: '', books: null, book: null });
    }
    try {
        if (DisplayAll) {
            const books = await Book.find().populate('authId');
            return res.render('displayBook', { message1: '', message2: 'All Books', books, book: null });
        }

        if (book_id) {
            const foundBook = await Book.findOne({ BookId: book_id }).populate('authId');
            if (foundBook) {
                return res.render('displayBook', { message1: '', message2: 'Book Found', books: null, book: foundBook });
            } else {
                return res.render('displayBook', { message1: 'No Book Found with given ID', message2: '', books: null, book: null });
            }
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        return res.render('displayBook', { message1: 'Please Check Book ID should be a Number', message2: '', books: null, book: null });
    }
};

// Update Book
const updateBook = async (req, res) => {
    const { book_id, title, genre, publication_year } = req.body;
    try {
        const { book_id, title, genre, publication_year } = req.body;
        const book = await Book.findOne({ BookId: book_id })
        if (!book) {
            return res.render('updateBook', { message1: 'Book Not Found', message2: '' });
        }
        book.Title = title
        book.Genre = genre
        book.Publication_Year = publication_year
        await book.save();
        res.render('updateBook', { message1: '', message2: 'Updated Successfully' });
    } catch (error) {
        console.error("Error updating book:", error);
        res.render('updateBook', { message1: 'Please check the Field type', message2: '' });
    }
};
// Delete Book
const deleteBook = async (req, res) => {
    const { book_id } = req.body;

    try {
        const deletedBook = await Book.findOneAndDelete({ BookId: book_id });

        if (!deletedBook) {
            return res.render('deleteBook', { message1: 'Book Not Found', message2: '' });
        }
        return res.render('deleteBook', { message1: '', message2: 'Book Deleted sucessfully' });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.render('deleteBook', { message1: 'Please Check Book ID it should be a Number', message2: '' });
    }
};
module.exports = { displayBook, addBook, updateBook, deleteBook };
