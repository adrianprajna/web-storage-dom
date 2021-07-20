const UNFINISHED_LIST = ".unfinished-reading";
const FINISHED_LIST = ".finished-reading";

const addBook = () => {
    const title = document.querySelector("#txtTitle").value;
    const author = document.querySelector("#txtAuthor").value;
    const year = document.querySelector("#txtYear").value;
    const isComplete = document.querySelector("#checkReading").checked;

    const book = makeBook(title, author, parseInt(year), isComplete);
    const bookObj = composeBook(title, author, parseInt(year), isComplete);

    book["bookId"] = bookObj.id;
    books.push(bookObj); 

    if(!isComplete){
        const unfinishedReadingList = document.querySelector(UNFINISHED_LIST);
        unfinishedReadingList.appendChild(book);
    }
    else {
        const finishedReadingList = document.querySelector(FINISHED_LIST);
        finishedReadingList.appendChild(book);
    }

    updateDataToStorage();
    clear();
}

const makeBook = (title, author, year, isComplete) => {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `
        <h3>${title}</h3>
        <p>${author}, <span>${year}</span></p>
    `
    if(!isComplete)
        book.appendChild(createFinishButton());
    else
        book.appendChild(createUnFinishButton());

    book.appendChild(createRemoveButton());
    return book;
}

const createButton = (classList, innerText, eventListener) => {
    const button = document.createElement("button");
    button.setAttribute("class", classList)
    button.innerText = innerText;
    button.addEventListener("click", (e) => {
        eventListener(e);
    })
    return button;
}

const createFinishButton = () => {
    return createButton("btn blue finish", "Finish Reading", (e) => {
        toggleFinish(e.target.parentElement, ".finish", createUnFinishButton(), FINISHED_LIST);
    })
}

const createUnFinishButton = () => {
    return createButton("btn blue unfinish", "Unfinish Reading", (e) => {
        toggleFinish(e.target.parentElement, ".unfinish", createFinishButton(), UNFINISHED_LIST);
    })
}

const createRemoveButton = () => {
    return createButton("btn red delete", "Remove Book", (e) => {
        
        const modal = document.querySelector(".modal-bg");
        modal.classList.add("active");

        const btnRemove = document.getElementById("btnRemove");
        btnRemove.addEventListener("click", () => {
            const book = e.target.parentElement;
            console.log(book);
            const bookPosition = findBookIndex(book["bookId"]);
            books.splice(bookPosition, 1);

            book.remove();
            updateDataToStorage();
            modal.classList.remove("active");
        })

        const btnClose = document.getElementById("btnClose");
        btnClose.addEventListener("click", () => {
            modal.classList.remove("active");
        })

    })
}

const toggleFinish = (book, oldBtnClassType, newButton, containerClassType) => {
    const btn = book.querySelector(oldBtnClassType);
    const btnDelete = book.querySelector(".delete");

    btnDelete.remove();
    book.removeChild(btn);
    book.appendChild(newButton);
    book.appendChild(btnDelete);

    const bookData = findBook(book["bookId"]);
    bookData.isComplete = !bookData.isComplete;

    const list = document.querySelector(containerClassType);
    list.appendChild(book);
    updateDataToStorage();
}

const clear = () => {
    document.querySelector("#txtTitle").value = "";
    document.querySelector("#txtAuthor").value = "";
    document.querySelector("#txtYear").value = "";
    document.querySelector("#checkReading").checked = false;
}

const searchBook = () => {
    const title = document.querySelector("#searchBookTitle").value;
    const searchedBooks = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    renderSearchedList(searchedBooks);

    document.querySelector("#searchBookTitle").value = "";
}

const renderSearchedList = (searchedBooks) => {
    const unfinishedReadingList = document.querySelector(".unfinished-reading");
    const finishedReadingList = document.querySelector(".finished-reading");
    unfinishedReadingList.innerHTML = `
        <h2>Unfinished Reading</h2>
        <hr>
    `;
    finishedReadingList.innerHTML = `
        <h2>Finished Reading</h2>
        <hr>
    `;
    
    searchedBooks.forEach((book) => {
        const bookElement = makeBook(book.title, book.author, book.year, book.isComplete);
        bookElement["bookId"] = book.id;
        
        if(!book.isComplete)
            unfinishedReadingList.appendChild(bookElement);
        else 
            finishedReadingList.appendChild(bookElement)
    })
}
