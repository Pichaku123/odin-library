const library=[];
const newBook=document.querySelector("#newbook");
const modal=document.querySelector("#modal");
const submit=document.querySelector("#submit");
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
    return book;
}

function displayBook(library, card, position){
        card.innerHTML=`<h2>${library[position].title}</h2>
        Author- ${library[position].author}<br>
        Pages- ${library[position].pages}<br>
        Read or not- ${(library[position].read) ? "Read" : "Not read"}<br>
        ID- ${library[position].id}<br><br>`;
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
    const read=(readValue === "Yes");

    if(!author || !title || !pages || readValue=="default"){
        alert("Please fill all the fields.");
        return;
    }

    const currBook=addToLib(author, title, pages, read);

    makeCard(currBook);
    available.textContent=`Total Books= ${library.length}`;

    form.reset();
    console.log(library);   
});

function makeCard(currBook){
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

    let bookPosition=library.findIndex((item) => {
            return item.id === currBook.id;
    });

    displayBook(library, text, bookPosition);     //shows the card with book details
    container.appendChild(card);
    card.appendChild(text);
    card.appendChild(cardBtn);

    available.textContent=`Total Books= ${library.length}`;
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
        available.textContent=`Total Books= ${library.length}`;
    });

    //same as remove, we need to add it to every card

    readToggle.addEventListener("click", () => {
        //to find index of current book
        let bookPosition=library.findIndex((item) => {
            return item.id === currBook.id;
        });
        library[bookPosition].read=!library[bookPosition].read;
        console.log(library[bookPosition].read);
        displayBook(library, text, bookPosition);
    });
}


//data for testing
addToLib("Hajime Isayama", "Attack on Titan", 34 * 20, true);             // Completed 34 vols :contentReference[oaicite:1]{index=1}
addToLib("Eiichiro Oda", "One Piece", 100 * 20, false);                  // Ongoing 100 vols :contentReference[oaicite:2]{index=2}
addToLib("Tite Kubo", "Bleach", 74 * 20, false);                          // Completed 74 vols :contentReference[oaicite:3]{index=3}
addToLib("Masashi Kishimoto", "Naruto", 72 * 20, true);                  // Completed 72 vols :contentReference[oaicite:4]{index=4}
addToLib("Koyoharu Gotōge", "Demon Slayer", 23 * 20, true); // Completed 23 vols :contentReference[oaicite:5]{index=5}
addToLib("Yūto Tsukuda & Shun Saeki", "Food Wars", 35 * 20, false); // Example popular series
addToLib("Naoki Urasawa", "Monster", 18 * 200, false);                   // 18 vols :contentReference[oaicite:6]{index=6}
addToLib("Takehiko Inoue", "Vagabond", 37 * 20, false);                   // Ongoing despite hiatus :contentReference[oaicite:7]{index=7}
addToLib("Tatsuki Fujimoto", "Chainsaw Man", 20 * 20, true);             // Completed first part :contentReference[oaicite:8]{index=8}
addToLib("Haruo Yamaguchi", "Jujutsu Kaisen", 24 * 20, true);           // Ongoing :contentReference[oaicite:9]{index=9}


library.forEach(book => makeCard(book));

console.log(library);

