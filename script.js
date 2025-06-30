const library=[];

function Book(author, title, pages, read){
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.read=read;
    this.id=crypto.randomUUID();
}

function addToLib(author, title, pages, read){
    const book=new Book(author, title, pages, read);
    library.push(book);
}

function displayBook(library, card, i){

        card.innerHTML+=`Book No. ${i+1}<br>
        Author- ${library[i].author}<br>
        Title- ${library[i].title}<br>
        Pages- ${library[i].pages}<br>
        Read or not- ${library[i].read}<br><br>`;
    
}

addToLib("me", "mybook", 200, true);
addToLib("someone else", "theirbook", 500, false);
addToLib("some third person", "whatever", 10, true);
addToLib("balwant", "tiger zinda hai", 44, true);
addToLib("balwant", "tiger kyu nahi marega", 100, true);

const container=document.querySelector(".container");
const noOfCards=library.length;

library.reduce((bookNo, book) => {
    const card=document.createElement("div");
    card.classList.add("card");
    displayBook(library, card, bookNo);
    container.appendChild(card);
    return ++bookNo;
}, 0);

