const Author = require("../model/author");

// Add Author
const addAuthor = async (req, res) => {
    const { author_id, name, bio, nationality } = req.body;
    try {
        const existingAuthor = await Author.findOne({ AuthorId: author_id });

        if (existingAuthor) {
            return res.render('addAuthor', { message1: 'Author ID Already Exists', message2: '' });
        }

        const newAuthor = new Author({ AuthorId: author_id, Name: name, Bio: bio, Nationality: nationality });
        console.log(newAuthor);
        await newAuthor.save();

        res.render('addAuthor', { message1: '', message2: 'Author Added Successfully' });
    } catch (error) {
        console.error("Error adding author:", error);
        res.render('addAuthor', { message1: 'Please check the Field type', message2: '' });
    }
};

// Display Author
const displayAuthor = async (req, res) => {
    const { author_id, DisplayAll } = req.body;

    if (!author_id && !DisplayAll) {
        return res.render('displayAuthor', { message1: 'Please Enter an Author ID', message2: '', authors: null, author: null });
    }

    try {
        if (DisplayAll) {
            const authors = await Author.find();
            return res.render('displayAuthor', { message1: '', message2: 'All Authors', authors, author: null });
        }

        if (author_id) {
            const foundAuthor = await Author.findOne({ AuthorId: author_id });
            if (foundAuthor) {
                return res.render('displayAuthor', { message1: '', message2: 'Author Found', authors: null, author: foundAuthor });
            } else {
                return res.render('displayAuthor', { message1: 'No Author Found with given ID', message2: '', authors: null, author: null });
            }
        }
    } catch (error) {
        console.error("Error fetching author:", error);
        return res.render('displayAuthor', { message1: 'Please Check Author ID should be a Number', message2: '', authors: null, author: null });
    }
};

// Update Author
const updateAuthor = async (req, res) => {
    const { author_id, name, bio, nationality } = req.body;

    try {
        const { author_id, name, bio, nationality } = req.body
        const author = await Author.findOne({ AuthorId: author_id });
        if (!author) {
            return res.render('updateAuthor', { message1: 'Author NOT Exist', message2: '' });
        }
        author.Name = name;
        author.Bio = bio;
        author.Nationality = nationality;
        await author.save();
        return res.render('updateAuthor', { message1: '', message2: 'Author Updated Successfully' })

    } catch (error) {
        console.error("Error updating author:", error);
        res.render('updateAuthor', { message1: 'Please check the Field type', message2: '' });
    }
};

// Delete Author
const deleteAuthor = async (req, res) => {
    const { author_id } = req.body;

    try {
        const deletedAuthor = await Author.findOneAndDelete({ AuthorId: author_id });

        if (!deletedAuthor) {
            return res.render('deleteAuthor', { message1: 'Author Not Found', message2: '' });
        }
        return res.render('deleteAuthor', { message1: '', message2: 'Deleted successfully' });
    } catch (error) {
        console.error("Error deleting author:", error);
        res.render('deleteAuthor', { message1: 'Please Check Author ID it should be a Number', message2: '' });
    }
};

module.exports = { addAuthor, displayAuthor, updateAuthor, deleteAuthor };
