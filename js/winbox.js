

//Get messagebox
var winmessagebox = document.getElementById('winmessagebox');



// Get the <span> element that closes the messagebox
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the messagebox
span.onclick = function() {
    winmessagebox.style.display = "none";
}

// When the user clicks anywhere outside of the messagebox, close it
window.onclick = function(event) {
    if (event.target == winmessagebox) {
        winmessagebox.style.display = "none";
    }
}