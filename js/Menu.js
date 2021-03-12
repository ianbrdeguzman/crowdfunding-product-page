import { menuList } from './menulist.js';

class Menu {
    update() {
        this.scrollMenu();
        this.displayMenu();
        const button = document.querySelector('#menu-btn');
        const links = document.querySelectorAll('li');

        button.addEventListener('click', () => {
            const container = document.querySelector('.menu-container');
            if (container.classList.contains('active')) {
                container.classList.remove('active');
                button.firstElementChild.src = './images/icon-hamburger.svg';
            } else {
                container.classList.add('active');
                button.firstElementChild.src = './images/icon-close-menu.svg';
            }
        });

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const container = document.querySelector('.menu-container');
                if (e.target.firstElementChild) {
                    const element = e.target.firstElementChild
                        .getAttribute('href')
                        .slice(1);
                    this.scrollLink(element);
                } else {
                    const element = e.target.getAttribute('href').slice(1);
                    this.scrollLink(element);
                }

                container.classList.remove('active');
                button.firstElementChild.src = './images/icon-hamburger.svg';
            });
        });
    }
    scrollMenu() {
        const header = document.querySelector('header');
        const headerBottomPosition = header.getBoundingClientRect().bottom;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > headerBottomPosition) {
                header.style.backgroundColor = '#2f2f2f';
            } else {
                header.style.backgroundColor = 'transparent';
            }
        });
    }
    scrollLink(element) {
        const position = document.getElementById(element).offsetTop;

        window.scrollTo({
            top: position - 110,
            left: 0,
            behavior: 'smooth',
        });
    }
    displayMenu() {
        menuList.forEach((menu) => {
            const container = document.querySelector('ul');
            const html = `<li><a href="#${menu}">${menu}</a></li>`;
            container.insertAdjacentHTML('beforeend', html);
        });
    }
}

export default Menu;
