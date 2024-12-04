const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

function loadData() {
  const catSection = document.querySelector("#category");
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.innerHTML = cat.name;
    catSection.append(option);
  });

  document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("Pname").value;
    const level = document.querySelector("#difficulty").value;
    const category = document.getElementById("category").value;

    if (!name || !level || !category) {
      alert("Please fill out all fields.");
      return;
    }

    // Store data in localStorage for retrieval in Question.html
    localStorage.setItem("quizData", JSON.stringify({ name, level, category }));
    window.location.href = "Question.html";
  });
}

loadData();
