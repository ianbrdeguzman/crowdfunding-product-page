import { pledges } from './pledges.js';

class Modal {
    constructor() {
        this.modalBtn = document.querySelector('#modal-button');
        this.modalCloseBtn = document.querySelector('#modal-close');
        this.modalContainer = document.querySelector('.modal-container');
    }
    update() {
        this.openModal();
        this.closeModal();
        this.displayModal();
        this.checkBoxModal();
        this.bookmarkUpdate();
    }
    openModal() {
        this.modalBtn.addEventListener('click', () => {
            this.modalContainer.classList.toggle('active');
        });
    }
    closeModal() {
        this.modalCloseBtn.addEventListener('click', () => {
            this.modalContainer.classList.toggle('active');
        });
    }
    displayModal() {
        pledges.forEach((pledge) => {
            const { id, title, textOne, textTwo, amount } = pledge;
            const container = document.querySelector('.modal-pledge-container');
            const html = `
            <div class="modal-pledge-item">
                <label>
                    <div>
                        <input
                            type="radio"
                            name="pledge"
                            id="${id}"
                            />
                        <div>
                            <p>${title}</p>
                            <p>${textOne}</p>
                        </div>
                    </div>
                    <p class="pledge-item-info">${textTwo}</p>
                </label>
            </div>
        `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }
    checkBoxModal() {
        const checkboxes = document.querySelectorAll('input[type=radio]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                console.log(checkbox);
            });
        });
    }
    bookmarkUpdate() {
        const bookmarkBtn = document.querySelector('#bookmark');
        bookmarkBtn.addEventListener('click', () => {
            if (!bookmarkBtn.classList.contains('book')) {
                bookmarkBtn.setAttribute('class', 'book');
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark-booked.svg';
                // set local storage
            } else if (bookmarkBtn.classList.contains('book')) {
                bookmarkBtn.removeAttribute('class', 'book');
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark.svg';
                // set local storage
            }
        });
    }
}

export default Modal;
