console.log("js connected");


const pages = [
    "index",
    "Te-Poutokomanawa",
    "Te-Toka-a-Tirikawa",
    "Te-Pou-Ruawhet%C5%AB-a-R%C4%93hua",
    "P%C4%81tiki",
    "Ng%C4%81-Maunga",
    "He-niho-taniwha-he-kete-kai-he-maunga",
    "Pou-t%C5%AB%C4%81rongo",
    "Ng%C4%81-Waka",
    "Te-Moana",
    "Ng%C4%81-Hau-e-Wh%C4%81-o-te-Ao",
    "Hine-Turama-%26-Hine-te-%C4%81huru",
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

//Somehow this is making the text not load...
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

//Audio player stuff, please don't mind the mess
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');

//Play audio
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused)
    {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
    
});

//Update seek bar as the audio progresses
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration)
    {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

//seek audio
seekBar.addEventListener('input', () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});
