const {nanoid} = require('nanoid')
const books = require('./books')

const addBook = (request, h) => {
    const { name, year, author, summary, 
            publisher, pageCount, readPage, reading } = request.payload;
    
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount == readPage;
    
    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }else if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
      }

    const newBook = {
        id,name, year, author, summary, 
        publisher, pageCount, readPage,reading,
        insertedAt, updatedAt, finished
    };

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;


    if (isSuccess) {
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
        bookId: id,
        },
    });
    response.code(201);
    return response;
    }

    const response = h.response({
    status: 'fail',
    message: 'mohon isi dengan benar',
    });
    response.code(500);
    return response;
};

const getAllBooks = () => {
    const booksList = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    return {
        status: 'success',
        data: {
           books: booksList
        }
    }
};

const DetailBooks = (request, h) => {
    const {id} = request.params
    const book = books.find((book) => book.id === id);
    console.log(book);

    if(book !== undefined){
            const response = h.response({
                status: 'success',
                data: { 
                    book,
                },
                })
                response.code(200);
                return response ;
    } 

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
        })
        response.code(404);
        return response ;


}    


const UpdateBooks = (request, h) => {
    const {id} = request.params
    const { name, year, author, summary, 
        publisher, pageCount, readPage, reading } = request.payload;
    
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);
    console.log(index);

    if(index !== undefined){
        if(!name){
            const response = h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku"
            });
            response.code(400);
            return response;
        }else if (readPage > pageCount) {
            const response = h.response({
              status: 'fail',
              message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            });
            response.code(400);
            return response;
          }
          
          books[index] = {
            ...books[index],
            name, year, author,summary, 
            publisher, pageCount, readPage, reading, updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
          });
          response.code(200);
          return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}    

const DeleteBooks = (request, h) => {
    const {id} = request.params
    const index = books.findIndex((book) => book.id === id);
 
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}

module.exports = {addBook,getAllBooks,DetailBooks, UpdateBooks, DeleteBooks}