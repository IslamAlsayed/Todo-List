let create = document.getElementById("create");
let notes = document.getElementById("notes");
let createBox = document.getElementById("create-box");
let userInput = document.getElementById("userInput");
let note_alone;
let notes_localStorage = JSON.parse(localStorage.getItem("notes")) || [];
let id_from_noteLength = notes_localStorage.length || 0;

// Open the textarea with click function
create.addEventListener("click", () => {
  createBox.style.display = "block";
  userInput.focus();
});

userInput.addEventListener("keydown", content);

// Create a new note with click [ Enter ] function
function content(e) {
  if (e.keyCode == 13) {
    if (userInput.value != "") {
      // Create a new note main function
      create_note(userInput);
      createBox.style.display = "none";
      new Audio("./sounds/click.mp3").play();
    }
    reset_id();
  }
}

// Get notes from localStorage
get_notes_from_localStorage();

// Create a new note main function
function create_note(userInput) {
  // Random background
  const list_colers = [
    "#079992",
    "#1e3799",
    "#60a3bc",
    "#3dc1d3",
    "#1B9CFC",
    "#82589F",
    "#f53b57",
    "#05c46b",
    "#7d5fff",
  ];
  const random_color = Math.floor(Math.random() * list_colers.length);
  const random_color_value = list_colers[random_color];
  id_from_noteLength++;

  // Create element new note alone
  let note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `${userInput.value}`;
  note.style.backgroundColor = random_color_value;

  // Create element id for everyNote
  let span = document.createElement("span");
  span.innerHTML = `#${id_from_noteLength}`;

  // Append element id in element note
  note.appendChild(span);

  // Append element note in element perent notes
  notes.appendChild(note);

  // Set a target note in localStorage
  set_notes_in_localStorage(userInput.value, random_color_value);
  userInput.value = "";
}

// Set notes in localStorage
function set_notes_in_localStorage(userInput, random_color_value) {
  // Push data for every new note in array
  notes_localStorage.push({
    id: id_from_noteLength,
    inner_note: userInput.trim(),
    color_note: random_color_value,
  });

  // Set array to new note in localStorage
  localStorage.setItem("notes", JSON.stringify(notes_localStorage));
}

// Get notes from localStorage
function get_notes_from_localStorage() {
  // Result the notes and append perent notes
  notes_localStorage.forEach((note) => {
    let note_alone = document.createElement("div");
    note_alone.className = "note";
    note_alone.setAttribute("data-id", note.id - 1);
    note_alone.style.backgroundColor = note.color_note;

    let span = document.createElement("span");
    span.innerHTML = `#${note.id}`;
    note_alone.appendChild(span);

    note_alone.innerHTML += note.inner_note;
    notes.append(note_alone);
  });
}

// Reset increment id on all notes
function reset_id() {
  let id = 0;
  let all_notes = document.querySelectorAll(".note");
  all_notes.forEach((note) => {
    note.setAttribute("data-id", id++);
  });
}

document.addEventListener("dblclick", (e) => {
  if (e.target.className == "note") {
    e.target.remove();

    // Remove a note lone note from local array
    notes_localStorage.splice(e.target.dataset.id, 1);

    // Update notes array in localStorage
    localStorage.setItem("notes", JSON.stringify(notes_localStorage));
    // location.reload();
    reset_id();
  }
});
