const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector(".close-dialog");
const confirmButton = document.querySelector(".confirm-button");

const dialogBookTitle = document.querySelector("input#book-title");
const dialogBookAuthor = document.querySelector("input#book-author");
const dialogBookPages = document.querySelector("input#book-pages");
const dialogBookScore = document.querySelector("input#book-score");
const dialogBookStatus = document.querySelector("select#book-status");
const dialogBookCover = document.querySelector("input#book-cover");

let myLibrary = [
    new Book(
        "Harry Potter and the Prisoner of Azkaban",
        "J.K. Rowling",
        480,
        "4,5",
        "read",
        "https://m.media-amazon.com/images/I/71NaVwWsRDL._SY466_.jpg",
    ),
  new Book (
    "The Structure of Scientific Revolutions",
    "T.S. Kuhn",
    264,
    "4,3",
    "not-read",
    "./images/no-image-ph.png",
  ),
];

function Book(
  title,
  author,
  pages,
  score,
  status,
  cover = "./images/no-image-ph.png"
) {
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.score = score),
    (this.status = status),
    (this.cover = cover);
}

// Add book reading method
Book.prototype.bookReading = function () {
    this.status = "reading";
};

// Add book completed method
Book.prototype.bookCompleted = function () {
    this.status = "read";
};

function createNewBookCard(book, index) {
    // Create book card
    const bookCard = document.createElement("article");
    bookCard.classList.toggle("book-card");
    bookCard.setAttribute("data-index", index);
    booksContainer.appendChild(bookCard);

    // Add book title
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookTitle.classList.toggle("book-title");
    bookCard.appendChild(bookTitle);

    // Add book author
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `by ${book.author}`;
    bookAuthor.classList.toggle("book-author");
    bookCard.appendChild(bookAuthor);

    // Add book pages
    const bookPages = document.createElement("div");
    bookPages.textContent = `${book.pages} pages`;
    bookPages.classList.toggle("book-pages");
    bookCard.appendChild(bookPages);

    // Add book score
    const bookScore = document.createElement("div");
    bookScore.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>';
    const scoreText = document.createTextNode(` ${book.score} `);
    const reviewsSpan = document.createElement("span");
    reviewsSpan.classList.toggle("book-reviews");
    reviewsSpan.textContent = "(reviews)";
    bookScore.classList.toggle("book-score");
    bookScore.appendChild(scoreText);
    bookScore.appendChild(reviewsSpan);
    bookCard.appendChild(bookScore);

    // Add book action buttons
    const bookActionButtons = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.classList.toggle("delete-book-button");
    deleteButton.setAttribute("title", "Delete the current book");
    deleteButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z" /></svg>';
    deleteButton.addEventListener("click", () => {
        deleteBook(index);
    });
    bookActionButtons.appendChild(deleteButton);

    const readingButton = document.createElement("button");
    readingButton.classList.toggle("reading-book-button");
    readingButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M17 16V22L22 19L17 16Z" /></svg>';
    readingButton.setAttribute("title", 'Mark current book as "Reading"');
    readingButton.addEventListener("click", () => {
        book.bookReading();
        console.log(myLibrary);
        createLibrary();
    })
    bookActionButtons.appendChild(readingButton);

    const completedButton = document.createElement("button");
    completedButton.classList.toggle("completed-book-button");
    completedButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z" /></svg>';
    completedButton.setAttribute("title", 'Mark current book as "Completed"');
    completedButton.addEventListener("click", () => {
        book.bookCompleted();
        createLibrary();
    })
    bookActionButtons.appendChild(completedButton);
    
    bookActionButtons.classList.toggle("book-action-buttons");
    bookCard.appendChild(bookActionButtons);

    // Add book status
    const bookStatus = document.createElement("div");
    if (book.status === "read") {
        bookStatus.textContent = "Completed";
        bookCard.classList.toggle("book-completed");
        bookStatus.classList.toggle("status-completed");
    } else if (book.status === "reading") {
        bookStatus.textContent = "Currently reading";
        bookCard.classList.toggle("book-reading");
        bookStatus.classList.toggle("status-reading");
    } else {
        bookStatus.textContent = "Not started";
        bookCard.classList.toggle("book-not-started");
        bookStatus.classList.toggle("status-not-started");
    };
    bookStatus.classList.toggle("book-status");
    bookCard.appendChild(bookStatus);

    // Add book image
    const bookImage = document.createElement("img");
    bookImage.src = book.cover;
    bookImage.classList.toggle("book-image");
    bookCard.appendChild(bookImage);
};

function createLibrary() {
    booksContainer.textContent = "";
    myLibrary.forEach(createNewBookCard);
};

createLibrary();

// Add book to the library

function addBookToLibrary() {
  const newBook = new Book(
    dialogBookTitle.value,
    dialogBookAuthor.value,
    dialogBookPages.value,
    dialogBookScore.value,
    dialogBookStatus.value,
    dialogBookCover.value || "./images/no-image-ph.png"
  );
  myLibrary.push(newBook);
  createNewBookCard(newBook);
}

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault(); // this is to avoid the form from "running"
  addBookToLibrary();
  dialog.close();
});

// Delete book function
function deleteBook(index) {
    myLibrary.splice(index, 1);
    createLibrary();
};