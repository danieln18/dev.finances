window.onload = () => {
    animeScroll();
};

const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList.add('active');
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList.remove('active');
    }
}

const target = document.querySelectorAll('.left-animation');
const animationClass = 'animate-table';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 6);
    target.forEach(function(e){
        if(windowTop > e.offsetTop) {
            e.classList.add(animationClass);
        } else {
            e.classList.remove(animationClass);
        }
    });
}

if(target.length) {

window.addEventListener('scroll', function() {
    animeScroll();
    console.log('kaskdasl')
})

}