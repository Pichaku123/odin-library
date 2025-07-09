//basically seperate logic and DOM parts.
const libraryItems= () =>  {
    const library= [];
    
    class Book{
        constructor(_author, _title, _pages, _read){
            this.author=_author;
            this.title=_title;
            this.pages=_pages;
            this.read=_read;
            this.id=crypto.randomUUID();
        }
    }

    function addToLib(author, title, pages, read){
        const book=new Book(author, title, pages, read);
        library.push(book);
        return book;
    }
    
    function readToggle(ID){
        let bookPosition= library.findIndex((item) => {
            item.id == currID;
        })
        library[bookPosition].read = !library[bookPosition].read;
    }

    function removeBook(ID){
        let bookPosition= library.findIndex((item) => {
            item.id == currID;
        })
        library.splice(bookPosition, 1);
    }

    let getBooks = () => library;

    return {addToLib, readToggle, removeBook, getBooks};
};

const displayController= () => {
    const newBook=document.querySelector("#newbook");
    const modal=document.querySelector("#modal");
    const submit=document.querySelector("#submit");
    const container=document.querySelector(".container");
    const form=document.querySelector("form");
    const available=document.querySelector(".available");

    let libraryContent= libraryItems();
    let library= libraryContent.getBooks();
    console.log(`Library here- ${library}`);
    
    function displayBook(currBook){
        const card=document.createElement("div");   //for overall card
        card.classList.add("card");

        const text=document.createElement("div");   //for text contents/details
        text.classList.add("text");

        const remove=document.createElement("button");  //delete button
        remove.classList.add("remove");
        remove.textContent="Remove Entry";

        const readToggle=document.createElement("button");
        readToggle.classList.add("read-toggle");
        readToggle.textContent="Toggle Read Status";

        const cardBtn=document.createElement("div");
        cardBtn.classList.add("card-btn");
        cardBtn.appendChild(remove);
        cardBtn.appendChild(readToggle);

        let position = library.findIndex((item) => {
            return item.id == currBook.id;
        })

        text.innerHTML=`<h2>${library[position].title}</h2>
        Author- ${library[position].author}<br>
        Pages- ${library[position].pages}<br>
        Read or not- ${(library[position].read) ? "Read" : "Not read"}<br>
        ID- ${library[position].id}<br><br>`;

        container.appendChild(card);
        card.appendChild(text);
        card.appendChild(cardBtn);
    }
    displayBook(libraryContent.addToLib("me", "mine", 200, true));
}

displayController();