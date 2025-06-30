const library=[];
const newBook=document.querySelector("#newbook");
const modal=document.querySelector("#modal");
const submit=document.querySelector("#submit");
const test=document.querySelector(".test");
const container=document.querySelector(".container");
const noOfCards=library.length;
let bookNo=1;
const available=document.querySelector(".available");

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

function displayBook(library, card, bookNo){

        const index=bookNo-1;
        card.innerHTML+=`Book No. ${bookNo}<br>
        Author- ${library[index].author}<br>
        Title- ${library[index].title}<br>
        Pages- ${library[index].pages}<br>
        Read or not- ${library[index].read}<br>
        ID-${library[index].id}<br><br>`;
    
}

newBook.addEventListener("click", () => {
    modal.showModal();
});

submit.addEventListener("click", (e) => {
    e.preventDefault();     //stops it from submitting and reloading
    modal.close(modal.returnValue);
});

modal.addEventListener("close", () => {
    const author=document.querySelector("#author").value;
    const title=document.querySelector("#title").value;
    const pages=document.querySelector("#pages").value;
    const readValue=document.querySelector("select").value;

    const read=(readValue=="Yes");  //true/false

    addToLib(author, title, pages, read);

    const card=document.createElement("div");
    card.classList.add("card");
    displayBook(library, card, bookNo);
    container.appendChild(card);

    available.textContent=`Available= ${bookNo}`;

    bookNo++;

});

console.log(library);

