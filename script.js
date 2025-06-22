const books = [
  { id: 1, title: "1984", author: "George Orwell", category: "Fiction" },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
  },
  {
    id: 3,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
  },
  { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy" },
  {
    id: 5,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    category: "Programming",
  },
];

const borrowed = [];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const bookList = document.getElementById("bookList");
const historyList = document.getElementById("historyList");

function renderBooks() {
  const search = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  bookList.innerHTML = "";
  books
    .filter((book) => {
      return (
        (category === "All" || book.category === category) &&
        book.title.toLowerCase().includes(search)
      );
    })
    .forEach((book) => {
      const card = document.createElement("div");
      card.className = "book";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <button onclick="borrowBook(${book.id})">Borrow</button>
      `;
      bookList.appendChild(card);
    });
}

function borrowBook(id) {
  const book = books.find((b) => b.id === id);
  if (!borrowed.includes(id)) {
    borrowed.push(id);
    const li = document.createElement("li");
    li.textContent = `${
      book.title
    } - borrowed on ${new Date().toLocaleDateString()}`;
    historyList.appendChild(li);
  }
}

searchInput.addEventListener("input", renderBooks);
categorySelect.addEventListener("change", renderBooks);

renderBooks();
