console.log("js connected");

let currPage = 0;
let pageMax = 2;
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
