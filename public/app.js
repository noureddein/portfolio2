// =============================
// ======= Loading Bar =========
// =============================


const percent = document.querySelectorAll('.percent')
const progress = document.querySelectorAll('.progress')

let delay = 10
let count = 0
progress.forEach(element => {
    let val = parsInteger(percent[count].innerHTML)
    setTimeout(animate(element, val), 200)
    count++
});

function animate(element, val) {
    element.style.width = `${val}%`
}

// ==========================================
// ======= Convert String to number =========
// ==========================================
function parsInteger(text) {
    text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    return parseInt(text)
}


// Change the navigation bar color AND Add the under line for the header
const header = document.querySelector('nav')
const home = document.querySelector('.home')
const about = document.querySelector('.about')
const skills = document.querySelector('.skills')
const contactMe = document.querySelector('.contactMe')
const myProjects = document.querySelector('.myProjects')
const backToTopButton = document.querySelector('.BTT-button')

const allSections = document.querySelectorAll('.section-container')

// home.classList.add('active')

const underLineNav = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            console.log(entry.target.id, entry.isIntersecting);
            // (entry.target.id === 'about_me_page' && entry.isIntersecting)
            //     ? about.classList.add('active')
            //     : about.classList.remove('active');

            // (entry.target.id === 'contact_me_page' && entry.isIntersecting)
            //     ? contactMe.classList.add('active')
            //     : contactMe.classList.remove('active');

            (entry.target.id === 'skills_page' && entry.isIntersecting)
                ? skills.classList.add('active')
                : skills.classList.remove('active');

            // (entry.target.id === 'projects_page' && entry.isIntersecting)
            //     ? myProjects.classList.add('active')
            //     : myProjects.classList.remove('active');



            // (entry.target.id === 'header_page' && entry.isIntersecting)
            //     ? home.classList.add('active')
            //     : home.classList.remove('active');



        })
        console.log('=======');

    }
)

allSections.forEach(item => underLineNav.observe(item))


window.onscroll = function () {
    let top = window.scrollY
    if (top > 20) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }

    // if (top > 100) {
    //     backToTopButton.classList.add('active')
    // } else {
    //     backToTopButton.classList.remove('active')
    // }

    // if (top > 300) {
    //     home.classList.remove('active')
    //     about.classList.add('active')
    // } else if (top < 300) {
    //     home.classList.add('active')
    //     about.classList.remove('active')
    // }
    // if (top > 1255) {
    //     home.classList.remove('active')
    //     about.classList.remove('active')
    //     skills.classList.add('active')
    // } else if (top < 1255 && top > 500) {
    //     skills.classList.remove('active')
    // }

    // if (top > 1886) {
    //     skills.classList.remove('active')
    //     myProjects.classList.add('active')
    // } else if (top < 1886) {
    //     myProjects.classList.remove('active')
    // }

    // if (top > 2320) {
    //     myProjects.classList.remove('active')
    //     contactMe.classList.add('active')
    // } else {
    //     contactMe.classList.remove('active')
    // }
}
// ======================
// ======= Slider =======
// ======================
const sliderContainer = document.querySelector('.projects')
const rightSlider = document.querySelector('.right-slider')
const leftSlider = document.querySelector('.left-slider')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = rightSlider.querySelectorAll('div').length

let activeSlideIndex = 0

leftSlider.style.top = `-${(slidesLength - 1) * 70}vh`

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0
        }
    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1
        }
    }
    rightSlider.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    leftSlider.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
}
// ======================
// ======= Form =========
// ======================
const form = document.getElementById('contact-me-form')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const name = $('#name').val().trim()
    const senderEmail = $('#senderEmail').val().trim()
    const subject = $('#subject').val().trim()
    const message = $('#message').val().trim()

    const data = {
        name,
        senderEmail,
        subject,
        message
    }

    $.post('/sendEmail', data, function () {
        console.log('server receive our data...')
    }).then(data => {
        console.log(data)
        if (data.message === true) {
            Swal.fire(
                'Thank you!',
                'Your email sent',
                'success'
            )
            form.reset()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })

})


// =========================================
// ======= Typing animation script =========
// =========================================

let typed = new Typed(".typing", {
    strings: ['Web Developer', 'Civil Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})
let typed_2 = new Typed(".typing-2", {
    strings: ['Web Developer', 'Civil Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

// =========================================
// ======= adding animation =========
// =========================================



function playingAnimation(className, animation, numberOfElements = 1 || 'many') {
    let elements
    numberOfElements === 1 ?
        elements = document.querySelector(className) :
        elements = document.querySelectorAll(className)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle(animation, entry.isIntersecting)
            if (entry.isIntersecting) observer.unobserve(entry.target)
        })
    }, { threshold: 0.5 })

    numberOfElements === 1 ?
        observer.observe(elements) :
        elements.forEach(item => observer.observe(item))
}



playingAnimation('.second-p', 'second-p-isVisible', 1)
playingAnimation('.show-on-scroll', 'is-visible', 'many')