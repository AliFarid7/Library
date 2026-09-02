const myLibrary = [
];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Book Title:", "Book Author:", "Pages Count:", "Read Status:");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Not Read");
addBookToLibrary("1984", "George Orwell", 328, "Not Read");
addBookToLibrary("No Country for Old Men", "Cormac McCarthy", 309, "Read");

function displayBooks() {
    const myBooksContainer = document.querySelector(".Bookcontainer")
    myBooksContainer.innerHTML = ""; //Clears Display
    myLibrary.forEach(function (book) {
        const div = document.createElement("div");
        div.classList.add("book-card");
        const p1 = document.createElement("p");
        p1.textContent = book.title;
        div.appendChild(p1);
        const p2 = document.createElement("p");
        p2.textContent = book.author;
        div.appendChild(p2);
        const p3 = document.createElement("p");
        p3.textContent = book.pages;
        div.appendChild(p3);
        const p4 = document.createElement("p");
        p4.textContent = book.read;
        div.appendChild(p4);
        myBooksContainer.appendChild(div);
    });
}

displayBooks();

const newBookButton = document.querySelector(".addBookButton");
const newBookDialog = document.querySelector("#add-book-dialog");
const closeModel = document.querySelector("#close-modal");
const addBookButton = document.querySelector("#add-book-button");



newBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
});

closeModel.addEventListener('click', () => {
    newBookDialog.close();
});

addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    const bookTitle = document.querySelector("#book_title").value;
    const bookAuthor = document.querySelector("#book_author").value;
    const pageCount = document.querySelector("#pages_count").value;
    const readStatus = document.querySelector("#read-status").value;
    addBookToLibrary(bookTitle, bookAuthor, pageCount, readStatus);
    displayBooks();
    newBookDialog.close();
});