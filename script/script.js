console.log("js connected");

/*
    list of all the pages in the website
    this is used to for the next and back buttons
    
    When adding new pages add them to the end of this list
*/
const pages = [
    "index",
    "Te-Poutokomanawa",
    "Te-Toka-a-Tirikawa",
    "Te-Pou-Ruawhet%C5%AB-a-R%C4%93hua",
    "Hine-Turama-%26-Hine-te-%C4%81huru",
    "Te-Manawaroa",
    "Kotahitanga"
];



// let currPage = 0;
let pageMax = (pages.length - 1);
// local storage for page number, or else make it 0
let currPage = 0;



//function to make currPage the current page
function setCurrPageURL() {
    const currPath = window.location.pathname;

    pages.forEach((page, index) => {
        if (currPath.includes(page)) {
            currPage = index;
        }
    });

    console.log("page: " + currPage);
}

// Manage file loading

document.addEventListener('DOMContentLoaded', function () {
    setCurrPageURL(); //get url
    setUpLoadText(); //load text
    loadText('/components/footer.html', 'footer', false);
    if(currPage == 0){
        loadText('/components/sticky-footer-index.html', 'stickyFooter', true);
    }
    else{
        loadText('/components/sticky-footer.html', 'stickyFooter', true);

    }
    

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
    const currPath = window.location.pathname;

    /*
        list of else if statements to load the appropriate audio file for a page

        When adding a new page add a new else if here for loading the audio
    */
    if (currPath.includes("Kotahitanga"))
    {
        audioPlayer.src = "/resources/audio/Kotahitanga.mp3";
    } else if (currPath.includes("Te-Toka-a-Tirikawa"))
    {
        audioPlayer.src = "/resources/audio/Pouwhenua.mp3";
    } else if (currPath.includes("Te-Pou-Ruawhet%C5%AB-a-R%C4%93hua")) 
    {
        audioPlayer.src = "/resources/audio/Celestial_Panel.mp3";
    } 
    else if (currPath.includes("Hine-Turama-%26-Hine-te-%C4%81huru")) 
    {
         audioPlayer.src = "/resources/audio/Hine_Turama_and_Hine_Te_Ahuru.mp3";
    } 
    else if (currPath.includes("Te-Poutokomanawa")) 
    {
         audioPlayer.src = "/resources/audio/Te_Poutokomanawa.mp3";
    } 
    else 
    {
        //audioPlayer.src = "";
    }

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
//Carousel functionality - note that this code is only relevant to the page for te manawaroa

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    const textDiv = document.getElementById('text-div');
    

    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    const currentSlide = slides[slideIndex - 1];
    const textFile = currentSlide.getAttribute('data-text');
    const audioFile = currentSlide.getAttribute('data-audio');
    const artInformation = currentSlide.getAttribute('data-info');

    //Update text
    if (textFile){
        fetch(textFile)
        .then(response => response.text())
        .then(text => {
            textDiv.textContent = text;
        })
        .catch(error => {
            textDiv.textContent = "Error loading text.";
            console.error("Error fetching the text file: ", error);
        });
    }

    //update audio test
    try {
        var source = document.getElementById('audioPlayer');
        source.src = audioFile;
        source.currentTime = 0;
    } catch (error) {
        console.error(error);
    }

    //update art details
    if (artInformation){

        fetch("/components/artInfo.html")
        .then(response => {
            if (!response.ok) {
                throw new Error('Cound not find the file' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('artDetails').innerHTML = data;
            document.getElementById('artDetails').innerHTML = document.getElementById(artInformation).innerHTML;
        })
        .catch(error => {
            console.error('There was a problem fetching the artdetails:', error);
        });


    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    //show current slide
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
