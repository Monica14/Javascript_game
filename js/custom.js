/* Header */
/* Open when someone clicks on the span element */
window.onload = function(e){
    
    var indexUrl = window.location.href; 
    var field = indexUrl.split('?')[1];
    
    if(field=='SpielStarten'){ 
       modal.style.display = "block"; 
       textWrapper.style.display = "none";
    }
}
  
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        textWrapper.style.display = "block";
    }
}
//Get modal
var modal = document.getElementById('startModal');
//Get messagebox
var messagebox = document.getElementById('startmessagebox');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the text box
var textWrapper = document.getElementById("text-wrapper");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function myfun1(){
	modal.style.display = "block";
	textWrapper.style.display = "none";
    closeNav();
}
function myfun() {
    window.location.href = "./index.html?SpielStarten";
    closeNav(); 
}
function closeFun(){
	modal.style.display = "none"; 
	textWrapper.style.display = "block";
    window.location.href = "./index.html";
}
