
// Get notes from localStorage
var notes = JSON.parse(localStorage.getItem("notes")) || [];

// This will store the index of the note we are editing
var editIndex = -1;


// Show the note form
function showNoteForm() {

    document.getElementById("noteForm").style.display = "block";

    document.getElementById("formTitle").innerHTML = "Create Note";

    document.getElementById("noteTitle").value = "";

    document.getElementById("noteContent").value = "";

    editIndex = -1;
}


// Hide the note form
function hideNoteForm() {

    document.getElementById("noteForm").style.display = "none";

}


// Save a new note or edit an existing note
function saveNote() {

    var title = document.getElementById("noteTitle").value.trim();

    var content = document.getElementById("noteContent").value.trim();


    // Prevent empty notes
    if (title == "" && content == "") {

        alert("Please write a title or note before saving.");

        return;
    }


    // If title is empty, give the note a default title
    if (title == "") {

        title = "Untitled Note";

    }


    // Create new note
    if (editIndex == -1) {

        var note = {

            title: title,

            content: content

        };

        notes.push(note);

    } else {

        // Edit existing note
        notes[editIndex].title = title;

        notes[editIndex].content = content;

    }


    // Save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));


    // Show the notes again
    displayNotes();


    // Hide the form
    hideNoteForm();

}


// Display all notes
function displayNotes() {

    var notesContainer = document.getElementById("notesContainer");

    notesContainer.innerHTML = "";


    // Show message if there are no notes
    if (notes.length == 0) {

        notesContainer.innerHTML = "<p>No notes yet. Create your first note!</p>";

    }


    // Loop through all notes
    for (var i = 0; i < notes.length; i++) {

        notesContainer.innerHTML +=

            "<div class='note'>" +

                "<h3>" + notes[i].title + "</h3>" +

                "<p>" + notes[i].content + "</p>" +

                "<button class='edit-btn' onclick='editNote(" + i + ")'>Edit</button>" +

                "<button class='delete-btn' onclick='deleteNote(" + i + ")'>Delete</button>" +

            "</div>";

    }


    // Update note count
    document.getElementById("noteCount").innerHTML =
        notes.length + " Notes";

}


// Edit a note
function editNote(index) {

    editIndex = index;


    // Show the form
    document.getElementById("noteForm").style.display = "block";


    // Change form heading
    document.getElementById("formTitle").innerHTML = "Edit Note";


    // Put the old note information in the form
    document.getElementById("noteTitle").value =
        notes[index].title;

    document.getElementById("noteContent").value =
        notes[index].content;

}


// Delete a note
function deleteNote(index) {

    var answer = confirm("Are you sure you want to delete this note?");


    if (answer == true) {

        notes.splice(index, 1);


        // Save the new notes list
        localStorage.setItem("notes", JSON.stringify(notes));


        // Display updated notes
        displayNotes();

    }

}


// Search notes
function searchNotes() {

    var searchText =
        document.getElementById("searchInput").value.toLowerCase();


    var notesContainer =
        document.getElementById("notesContainer");


    notesContainer.innerHTML = "";


    for (var i = 0; i < notes.length; i++) {

        var title =
            notes[i].title.toLowerCase();

        var content =
            notes[i].content.toLowerCase();


        // Check if title or content contains search text
        if (
            title.includes(searchText) ||
            content.includes(searchText)
        ) {

            notesContainer.innerHTML +=

                "<div class='note'>" +

                    "<h3>" + notes[i].title + "</h3>" +

                    "<p>" + notes[i].content + "</p>" +

                    "<button class='edit-btn' onclick='editNote(" + i + ")'>Edit</button>" +

                    "<button class='delete-btn' onclick='deleteNote(" + i + ")'>Delete</button>" +

                "</div>";

        }

    }

}


// Display notes when the page opens
displayNotes();

