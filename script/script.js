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
function setCurrPageURL() {
    const currPath = window.location.pathname;

    pages.forEach((page, index) => {
        if (currPath.includes(page)) {
            currPage = index;
        }
    });

    console.log("page: " + currPage);
}

// manage file loading

document.addEventListener('DOMContentLoaded', function () {
    setCurrPageURL(); //get url
    setUpLoadText(); //load text
    loadText('/components/footer.html', 'footer', false);
    loadText('/components/sticky-footer.html', 'stickyFooter', true);


});
function setUpLoadText() {
    const contentDiv = document.getElementById('text-div');
    const fileName = contentDiv.getAttribute('data-file');
    if (fileName) {
        loadText(fileName, 'text-div', false);
    }
}
// load elements from text files
function loadText(fileName, divId, events) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cound not find the file' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(divId).innerHTML = data;
            if (events) {
                addEvents();
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the file:', error);
        });
}

//  button functionality 
function addEvents() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    // next button functionality
    document.getElementById('next-button').addEventListener('click', function () {

        if (currPage < pageMax) {
            currPage++; // increase the page number
        }
        else {
            currPage = 0;
        }
        // go to next page
        console.log("page: " + currPage);
        navigateToPage();
    });

    // pervious button functionality 
    document.getElementById('prev-button').addEventListener('click', function () {

        if (currPage > 0) {
            currPage--; // decrease the page number
        }
        else {
            currPage = pageMax;
        }
        // go to previous page
        console.log("page: " + currPage);
        navigateToPage();
    });

    //Audio player stuff, please don't mind the mess
    //Play audio
    playPauseBtn.addEventListener('click', () => {

        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = "&#10074;&#10074;"; // Pause icon (||)
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = "&#9658;"; // Play icon (▶)
        }

    });

    //Update seek bar as the audio progresses
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        }
    });

    //seek audio
    seekBar.addEventListener('input', () => {
        audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
    });

}

function navigateToPage() {
    let pageUrl = "";
    // get the page to go to next and go there
    if (currPage === 0) {
        pageUrl = `/${pages[currPage]}.html`;

    } else {
        pageUrl = `/pages/${pages[currPage]}.html`;

    }
    window.location.href = pageUrl;
}

//==========================================================================================
//Carousel functionality 

const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev-btn');
const nxtBtn = document.querySelector('.nxt-btn');

let currentIndex = 0;

function showImage(index) {
    if (index < 0) {
        currentIndex = images.length - 1;
    } else if (index >= images.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    console.log("The current index is: ", currentIndex);

    //Shifting the images based on the current index
    const offset = -currentIndex * 100; 
    carouselImages.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    showImage(currentIndex - 1);
});

nxtBtn.addEventListener('click', () => {
    showImage(currentIndex + 1);
});