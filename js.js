const myLibrary = [
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();}

    info () {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }

    toggleReadStatus () {
    if (this.read === "Read") {
        this.read = "Not Read";
    }
    else {
        this.read = "Read";
    }
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
        div.dataset.id = book.id;
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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', () => {
            const bookId = div.dataset.id;
            const index = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        const changeReadStatusButton = document.createElement("button");
        changeReadStatusButton.textContent = "Change Read Status";
        changeReadStatusButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });

        if (!isNaN(book.pages)) { //To stop delete and toggleStatus button from showing up in first column
            div.appendChild(deleteButton);
            div.appendChild(changeReadStatusButton);
        }
    });
};


displayBooks();

const newBookButton = document.querySelector(".addBookButton");
const newBookDialog = document.querySelector("#add-book-dialog");
const closeModal = document.querySelector("#close-modal");
const addBookButton = document.querySelector("#add-book-button");

newBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
});

closeModal.addEventListener('click', () => {
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