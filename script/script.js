console.log("js connected");

// let currPage = 0;
let pageMax = 2;
// local storage for page number, or else make it 0
let currPage = 0;


//make currPage the current page
function setCurrPageURL(){
    const currPath = window.location.pathname;
    if(currPath.includes("index.html") || currPath === "/"){
        currPage = 0;
    } else if (currPath.includes("page1.html")) {
        currPage = 1;
    } else if (currPath.includes("page2.html")) {
        currPage = 2;
    } else {
        currPage = 0; // default to index
    }
    console.log("page: " + currPage);
}
setCurrPageURL();

// next button functionality (incomplete)
document.getElementById('next-button').addEventListener('click', function () {

    if (currPage < pageMax) {
        currPage++; // increase the page number
    }
    else{
        currPage = 0;
    }
    // go to next page
    console.log("page: " + currPage);
    navigateToPage();
});

// pervious button functionality (incomplete)
document.getElementById('prev-button').addEventListener('click', function () {
    
    if (currPage > 0) {
        currPage--; // decrease the page number
    }
    else{
        currPage = pageMax;
    }
    // go to previous page
    console.log("page: " + currPage);
    navigateToPage();
});
function navigateToPage() {

    // get the page to go to next and go there
    if (currPage === 0) {
        window.location.href = '/index.html';
    }
    else {
        const pageUrl = `/pages/page${currPage}.html`;
        window.location.href = pageUrl;
    }
}

// manage text file loading

document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('text-div');
    const fileName = contentDiv.getAttribute('data-file');
    if (fileName) {
        loadText(fileName, 'text-div');
    }
});
function loadText(fileName, divId){
    fetch(fileName)
    .then(response => {
        if (!response.ok) {
            throw new Error('Cound not find the text file' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById(divId).textContent = data;
    })
    .catch(error => {
        console.error('There was a problem fetching the text file:', error);
    });
}