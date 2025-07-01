const library=[];
const newBook=document.querySelector("#newbook");
const modal=document.querySelector("#modal");
const submit=document.querySelector("#submit");
const test=document.querySelector(".test");
const container=document.querySelector(".container");
const form=document.querySelector("form");
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
        card.innerHTML+=`Author- ${library[index].author}<br>
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

    if(!author || !title || !pages || readValue=="default"){
        alert("Please fill all the fields.");
        return;
    }

    addToLib(author, title, pages, read);

    const currBook=library[library.length-1];

    const card=document.createElement("div");   //for overall card
    card.classList.add("card");

    const remove=document.createElement("button");  //delete button
    remove.classList.add("remove");
    remove.textContent="Remove Entry";

    displayBook(library, card, library.length);     //shows the card with book details
    container.appendChild(card);
    card.appendChild(remove);

    //adding the event listener to every book, cuz using it outside means it's 
    //only adding it to the 1st remove button for the first card.
    //each book/card needs its own event listener for the remove button, sooo
    
    remove.addEventListener("click", () => {
        container.removeChild(card);
        //removing element from library
        let bookPosition=library.findIndex((item) => {
            return item.id === currBook.id;
        });
        library.splice(bookPosition, 1);
        available.textContent=`Available= ${library.length}`;
    });

    available.textContent=`Available= ${library.length}`;

    form.reset();

});

console.log(library);

