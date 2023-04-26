/* eslint-disable no-bitwise */
class BookStore {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const book = {
      title,
      author,
    };
    this.books.push(book);
    return book;
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  get allBooks() {
    return this.books;
  }

  set allBooks(books) {
    this.books = books;
  }
}
const addButton = document.getElementById('addButton');
const bookTitle = document.getElementById('titleInput');
const bookAuthor = document.getElementById('authorInput');
const bookItems = document.getElementById('display');
const bookshelf = new BookStore();

function displayBooks(books) {
  bookItems.innerHTML = '';
  books.forEach((book, index) => {
    const itemDiv = document.createElement('ul');
    itemDiv.className = 'displayFlex displayItemStyle';
    if (index % 2 === 0) {
      itemDiv.className = 'displayFlex displayItemStyle backgroundColor';
    }

    const bookItem = document.createElement('li');
    bookItem.className = 'itemAdd';
    const remLi = document.createElement('li');
    remLi.className = 'itemAdd';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn  btnStyle';
    deleteBtn.innerHTML = 'Remove';
    bookItem.textContent = `"${book.title}" by ${book.author}`;
    bookItems.appendChild(itemDiv);
    itemDiv.appendChild(bookItem);
    itemDiv.appendChild(remLi);
    remLi.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      bookshelf.removeBook(index);
      localStorage.setItem('books', JSON.stringify(bookshelf.allBooks));
      displayBooks(bookshelf.allBooks);
    });
  });
}

const storedBooks = JSON.parse(localStorage.getItem('books'));
if (storedBooks) {
  bookshelf.allBooks = storedBooks;
}
displayBooks(bookshelf.allBooks);

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  if ((bookTitle.value !== '') & (bookAuthor.value !== '')) {
    bookshelf.addBook(bookTitle.value, bookAuthor.value);
    localStorage.setItem('books', JSON.stringify(bookshelf.allBooks));
    displayBooks(bookshelf.allBooks);
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});
