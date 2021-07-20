document.addEventListener("DOMContentLoaded", () => {
    const addBookForm = document.querySelector("#add-book-form");
    const searchBookForm = document.querySelector("#search-book-form");
    const checkbox = document.querySelector("#checkReading");

    addBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addBook();
    })

    searchBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        searchBook();
    })

    checkbox.addEventListener("click", function() {
        const btnAddBook = document.getElementById("btnAddBook");
        if(this.checked){
            btnAddBook.innerText = "Add to Finished Reading";
        }
        else {
            btnAddBook.innerText = "Add to Unfinished Reading";
        }
    })
    
    if(isStorageExist()){
        loadDataFromStorage();
    }
})

