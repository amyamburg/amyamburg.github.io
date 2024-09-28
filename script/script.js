console.log("js connected");

// let currPage = 0;
let pageMax = 2;
// local storage for page number, or else make it 0
let currPage = parseInt(localStorage.getItem('currPage')) || 0;

// update the current page to local storage
function updateCurrPage(page) {
    localStorage.setItem('currPage', page);
}

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
    updateCurrPage(currPage);
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
    //store page number
    updateCurrPage(currPage);
    // get the page to go to next and go there
    if (currPage === 0) {
        window.location.href = '/index.html';
    }
    else {
        const pageUrl = `/pages/page${currPage}.html`;
        window.location.href = pageUrl;
    }
}
