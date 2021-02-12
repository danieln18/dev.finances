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

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const target = document.querySelectorAll('tr');
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

window.addEventListener('scroll', debounce(function() {
    animeScroll();
    console.log('sdjfsdk');
}), 500);

}