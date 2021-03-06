
// NAVIGATION BAR FUNCTION
var menuLinks = document.querySelectorAll(".header ul a");
var menuBtn = document.getElementById('menu-btn');
menuLinks.forEach(item => {
    item.addEventListener('click', function () {
        menuBtn.checked = false;
    })
})


// SCROLL FUNCTION

$('body').on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    // Store hash
    var targetOffset = $(this.hash).offset() ? $(this.hash).offset().top : 0;
    //change this number to create the additional off set        
    var customoffset = 74
    $('html, body').animate({ scrollTop: targetOffset - customoffset }, 80);
});

// HOME SLIDER FUNCTION
const slides = document.querySelector(".home-slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

prev.addEventListener("click", function () {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener("click", function () {
    nextSlide();
    updateCircleIndicator();
    resetTimer();

})

// create circle indicators
function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = i + 1;
        div.setAttribute("onclick", "indicateSlide(this)")
        div.id = i;
        if (i == 0) {
            div.className = "active";
        }
        indicator.appendChild(div);
    }
}
circleIndicator();

function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}

function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    }
    else {
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    changeSlide();
}

function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}

function resetTimer() {
    // when click to indicator or controls button 
    // stop timer 
    clearInterval(timer);
    // then started again timer
    timer = setInterval(autoPlay, 8000);
}


function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoPlay, 5000);


// SWIPER FUNCTION
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 40,
    autoHeight: true,
    updateOnWindowResize: true,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        320: {
            slidesPerView: 1.5,

        },
        425: {
            slidesPerView: 2,
            spaceBetween: 35,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 65,
        }
    }
});

// FORM SECTION

// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// Defining a function to validate form 
document.getElementById("submit-btn").addEventListener('click', function validateForm(e) {
    var name = document.getElementsByName("Name")[0].value;
    var email = document.getElementsByName("Email")[0].value;
    var mobile = document.getElementsByName("Mobile-no")[0].value;
    var freetime = document.getElementsByName("Free-time")[0].value;
    var services = document.getElementsByName("Services")[0].value;
    // console.log(name);
    e.preventDefault();

    // Defining error variables with a default value
    var nameErr = emailErr = mobileErr = countryErr = genderErr = true;


    // Validate name
    if (name == "") {
        printError("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }

    // Validate email address
    if (email == "") {
        printError("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    // Validate mobile number
    if (mobile == "") {
        printError("mobileErr", "Please enter your mobile number");
    } else {
        var regex = /^\d{10}$/;
        if (regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid mobile number");
        } else {
            printError("mobileErr", "");
            mobileErr = false;
        }
    }

    var dataPreview = `You've entered these details:
    Name: ${name}
    Email: ${email}
    Mobile-number: ${mobile}
    Free-time: ${freetime}
    Service: ${services}`

    alert(dataPreview);
})