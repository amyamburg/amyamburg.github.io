let currPage = 1;
let pageMax = 2;
// next button functionality (incomplete)
document.getElementById('next-button').addEventListener('click', function () {

    if (currPage < pageMax) {
        currPage++; // increase the page number
    }
    else{
        currPage = 1;
    }
    // go to next page
    navigateToPage()
});

// pervious button functionality (incomplete)
document.getElementById('prev-button').addEventListener('click', function () {
    
    if (currPage > 1) {
        currPage--; // decrease the page number
    }
    else{
        currPage = pageMax;
    }
    // go to previous page
    navigateToPage()
});
function navigateToPage() {
    // get the page to go to next and go there
    if (currentPage === 1) {
        window.location.href = 'index.html';
    } else {
        const pageUrl = `pages/page${currPage}.html`;
        window.location.href = pageUrl;
    }
}