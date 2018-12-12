

//Get messagebox
var messagebox = document.getElementById('startmessagebox');
var winmessagebox = document.getElementById('winmessagebox');

// Get the button that opens the messagebox
var btn = document.getElementById("startgame1");

// Get the <span> element that closes the messagebox
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the messagebox 
btn.onclick = function() {
    messagebox.style.display = "block";
}

// When the user clicks on <span> (x), close the messagebox
span.onclick = function() {
    messagebox.style.display = "none";
    winmessagebox.style.display = "none";
}

// When the user clicks anywhere outside of the messagebox, close it
window.onclick = function(event) {
    if (event.target == messagebox) {
        messagebox.style.display = "none";
    }
    if (event.target == winmessagebox) {
        winmessagebox.style.display = "none";
    }
}