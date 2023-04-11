const {addBook,getAllBooks, DetailBooks, UpdateBooks, DeleteBooks} = require('./handler.js')

const routes = [
    {
        method: "POST",
        path : "/books",
        handler : addBook,
    },

    {
        method: "GET",
        path : "/books",
        handler : getAllBooks,
    },

    {
        method: "GET",
        path : "/books/{bookId}",
        handler : DetailBooks,
    },

    {
        method: "PUT",
        path : "/books/{bookId}",
        handler : UpdateBooks,
    }, 

    {
        method: "DELETE",
        path : "/books/{bookId}",
        handler : DeleteBooks,
    }
];

module.exports = {routes};






