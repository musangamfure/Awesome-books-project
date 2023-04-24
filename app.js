const bookCollection = localStorage.getItem("bookCollection")
  ? JSON.parse(localStorage.getItem("bookCollection"))
  : [];
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const bookContainer = document.querySelector(".books-container");

function displayBooks() {
  bookContainer.innerHTML = "";
  bookCollection.forEach((book) => {
    bookContainer.insertAdjacentHTML(
      "beforeend",
      `<div>
            <div class ="displayTitle">
   <p>${book.title}</p>
   <p>${book.author}</p>
   </div>
    <button class="remove" type="button" id="${book.title}-${book.author}">Remove</button>
    <hr>
    </div>`
    );
  });

  const addButton = document.querySelector(".add-button");
  addButton.addEventListener("click", () => {
    if (title.value && author.value) {
      const bookObject = {
        title: title.value,
        author: author.value,
      };
      bookCollection.push(bookObject);
      title.value = "";
      author.value = "";
      displayBooks();
      localStorage.setItem("bookCollection", JSON.stringify(bookCollection));
    }
  });
  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach((removeBtn, index) => {
    removeBtn.addEventListener("click", () => {
      bookCollection.splice(index, 1);
      displayBooks();
      localStorage.setItem("bookCollection", JSON.stringify(bookCollection));
    });
  });
}
displayBooks();
