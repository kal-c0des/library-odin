const myLibrary = [];
const bookList = document.querySelector("#book-list");
const formContainer = document.querySelector("#book-form");

formContainer.style.display = "none";

document
  .querySelector("#new-book-btn")
  .addEventListener("click", openNewBookForm);
document
  .querySelector("#book-form")
  .addEventListener("submit", handleFormSubmit);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary(newBook);
}

function displayLibrary(book) {
  let bookEntry = document.createElement("div");
  let title = document.createElement("p");
  let author = document.createElement("p");
  let pages = document.createElement("p");
  let readBtn = document.createElement("button");
  let removeBtn = document.createElement("button");

  bookEntry.classList.add("book-card");

  title.textContent = `"${book.title}"`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;

  if (book.read) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-read");
  } else {
    readBtn.textContent = "Not Read";
    readBtn.classList.add("btn-not-read");
  }

  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", function () {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    bookList.removeChild(bookEntry);
  });

  readBtn.onclick = function () {
    if (book.read) {
      book.read = false;
      readBtn.textContent = "Not Read";
      readBtn.classList.remove("btn-read");
      readBtn.classList.add("btn-not-read");
    } else {
      book.read = true;
      readBtn.textContent = "Read";
      readBtn.classList.remove("btn-not-read");
      readBtn.classList.add("btn-read");
    }
  };

  bookEntry.append(title, author, pages, readBtn, removeBtn);
  bookList.append(bookEntry);
}

function openNewBookForm() {
  formContainer.style.display = "block";
}

function closeNewBookForm() {
  formContainer.style.display = "none";
}

function handleFormSubmit() {
  event.preventDefault();

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector(".read");

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  addBookToLibrary(title, author, pages, read);
  closeNewBookForm();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

// Sample Books
// addBookToLibrary("Harry Potter", "J.K. Rowling", 309, true);
// addBookToLibrary("Atomic Habits", "James Clear", 320, false);

// Extra Ideas
// TODO: Add count for total books
// TODO: Add count for total "read"
// TODO: Add count for total "not read"
