console.log("js connected");


const pages = [
    "index",
    "Te-Poutokomanawa",
    "Te-Toka-a-Tirikawa",
    "Te-Pou-Ruawhetū-a-Rēhua",
    "Te-Kuraimonoa",
    "Pātiki",
    "Ngā-Maunga",
    "He-niho-taniwha-he-kete-kai-he-maunga",
    "Pou-tūārongo",
    "Ngā-Waka",
    "Te-Moana",
    "Ngā-Hau-e-Whā-o-te-Ao",
    "Hine-Turama-&-Hine-te-āhuru",
    "Te-Manawaroa"
];
// let currPage = 0;
let pageMax = (pages.length - 1);
// local storage for page number, or else make it 0
let currPage = 0;

//make currPage the current page
function setCurrPageURL(){
    const currPath = window.location.pathname;

    pages.forEach((page, index) => {
        if (currPath.includes(page)) {
            currPage = index;
        }
    });

    console.log("page: " + currPage);
}

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
    let pageUrl = "";
    // get the page to go to next and go there
    if(currPage === 0){
     pageUrl = `/${pages[currPage]}.html`;

    } else{
    pageUrl = `/pages/${pages[currPage]}.html`;

    }
    window.location.href = pageUrl;
}

// manage text file loading

document.addEventListener('DOMContentLoaded', function() {
    setCurrPageURL();
    const contentDiv = document.getElementById('text-div');
    const fileName = contentDiv.getAttribute('data-file');
    if (fileName) {
        loadText(fileName, 'text-div');
    }
});
function loadText(fileName, divId){
    let prefix = "";
    if (window.location.pathname.includes("/pages/"))
    {
        // Go up one level for pages in the 'pages' folder
        prefix = "../";
    }

    fetch(prefix + fileName)
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