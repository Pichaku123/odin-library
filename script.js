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
    
    function readToggle(currBook){
        let bookPosition= library.findIndex((item) => {
            return item.id == currBook.id;
        })
        currBook.read = !currBook.read;
        console.log("toggled");
    }

    function removeBook(currID){
        let bookPosition= library.findIndex((item) => {
            return item.id == currID;
        })
        library.splice(bookPosition, 1);
        console.log("removed book");
    }

    let getBooks = () => library;

    return {addToLib, readToggle, removeBook, getBooks};
};

const displayController= (function() {
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

        remove.addEventListener("click", () => {
            libraryContent.removeBook(currBook.id);
            loadLibrary();  //reload library after removal
        });
        
        readToggle.addEventListener("click", () => {
            libraryContent.readToggle(currBook);
            loadLibrary();      //reload after toggle
        });

        container.appendChild(card);
        card.appendChild(text);
        card.appendChild(cardBtn);
        available.textContent= `Total Books- ${library.length}`;
        
    }

    function loadLibrary(){
        container.innerHTML="";
        library.forEach((book) => {
            displayBook(book);
        });
        available.textContent= `Total Books- ${library.length}`;
    }

    (function makeModal(){
        newBook.addEventListener("click", () => {
            modal.showModal();
        })

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

            const currBook=libraryContent.addToLib(author, title, pages, read);

            displayBook(currBook);
            available.textContent=`Total Books= ${library.length}`;
            loadLibrary();

            form.reset();
            console.log(library);   
        });
    })();
    
    //dummy data for testing-
    libraryContent.addToLib("Hajime Isayama", "Attack on Titan", 34 * 20, true);
    libraryContent.addToLib("Eiichiro Oda", "One Piece", 100 * 20, false);
    libraryContent.addToLib("Tite Kubo", "Bleach", 74 * 20, false);
    libraryContent.addToLib("Masashi Kishimoto", "Naruto", 72 * 20, true);
    libraryContent.addToLib("Koyoharu Gotōge", "Demon Slayer", 23 * 20, true);
    libraryContent.addToLib("Yūto Tsukuda & Shun Saeki", "Food Wars", 35 * 20, false);
    libraryContent.addToLib("Naoki Urasawa", "Monster", 18 * 200, false);
    libraryContent.addToLib("Takehiko Inoue", "Vagabond", 37 * 20, false);
    libraryContent.addToLib("Tatsuki Fujimoto", "Chainsaw Man", 20 * 20, true);
    libraryContent.addToLib("Haruo Yamaguchi", "Jujutsu Kaisen", 24 * 20, true);
    loadLibrary();
    
})();