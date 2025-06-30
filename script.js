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


addToLib("me", "mybook", 200, true);
console.log(library);
console.log(library[0].title);