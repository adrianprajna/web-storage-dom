const STORAGE_KEY = "BOOKS";
 
let books = [];
 
const isStorageExist = () => {
   return typeof(Storage) === undefined ? false : true;
}
 
const saveData = () => {
   const parsedBooks = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsedBooks);
}

const getAllData = () => {
    const unfinishedReadingList = document.querySelector(".unfinished-reading");
    const finishedReadingList = document.querySelector(".finished-reading");

    books.forEach((book) => {
        const bookElement = makeBook(book.title, book.author, book.year, book.isComplete);
        bookElement["bookId"] = book.id;
        
        if(!book.isComplete)
            unfinishedReadingList.appendChild(bookElement);
        else 
            finishedReadingList.appendChild(bookElement)
    })
}
 
const loadDataFromStorage = () => {
   const booksData = JSON.parse(localStorage.getItem(STORAGE_KEY));
   
   if(booksData !== null)
       books = booksData;

    getAllData();
}
 
const updateDataToStorage = () => {
   if(isStorageExist()){
       saveData();
   }
}
 
const composeBook = (title, author, year, isComplete) => {
   return {
       id: +new Date(),
       title,
       author,
       year,
       isComplete
   };
}
 
const findBook = (id) => {
   return books.find(book => book.id === id);
}
 
 
const findBookIndex = (id) => {
    return books.findIndex(book => book.id === id);
}