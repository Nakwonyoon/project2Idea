$(document).ready(function () {
  // buttons
  const submit = $("#searchBtn");
  const myQueueBtn = $("#myQ");
  const myLibraryBtn = $("#myL");
  // list
  const searchList = $("#searchResult");
  const MyQueueList = $("#myQueueList");
  const MyLibraryList = $("#myLibraryList");

  // Will search a book of title, author...etc and bring put the data into cardDeck function.
  function serachByTitle(searchInput) {
    const key = "kfqIZ6fbDX5FN0hEnk62w";
    let url = "https://www.goodreads.com/book/title.xml?key=" + key + "&title=" + searchInput;
    $.ajax({
      type: "GET",
      url: url
    }).then(function (response) {
      console.log(url);
      console.log(response)
      $.get("/api/mybooks", function () {
        const bookData = {
          title: response.title,
          author: response.author,
          publishDate: response.publishDate,
          genre: response.genre,
          synopsis: response.synopsis,
          hasRead: response.hasRead
        }
      }).then((bookData) => {
        res.send(cardDeck(bookData));
      })
      .catch((err) => console.log(err));
    })
  };
  
  // creating cardDeck 
  function cardDeck(bookData) {
    cardForm.append($("#books"));
    
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <h5 class="card-title">  ${bookData.title} </h5>
    <h6 class="card-text"> ${bookData.author}  </h6>
    <p> ${bookData.genre}</p>
    <p> ${bookData.synopsis}</p>
    <p> ${bookData.hasRead}</p>
    `;
  }
  // Submit the input by click or enter
  submit.on("keypress click", function (event) {
    event.preventDefault();
    searchList.show()
    MyQueueList.hide()
    MyLibraryList.hide()
    const searchInput = $(".searchInput").val().trim();
    serachByTitle(searchInput);
  });
  
  $("#searchBtn").keypress(function (event) {
    if (event.which == 13)
    submit.click();
  });
  myQueueBtn.on("click", () => {MyQueueList.show()})
  myLibraryBtn.on("click", () => {MyLibraryList.show()})
  
  
  
  // need remove contents
  
  
});