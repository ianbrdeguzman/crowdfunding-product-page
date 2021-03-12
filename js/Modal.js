import { pledges } from './pledges.js';
import { stats } from './stats.js';
import Stat from './Stat.js';
import Pledge from './Pledge.js';

class Modal {
    constructor() {
        this.modalBtn = document.querySelector('#modal-button');
        this.modalCloseBtn = document.querySelector('#modal-close');
        this.modalContainer = document.querySelector('.modal-container');
        this.successContainer = document.querySelector('.success-container');
    }
    update() {
        this.openModal();
        this.closeModal();
        this.displayModal();
        this.checkboxModalUpdate();
        this.bookmarkUpdate();
        this.closeSuccessModal();
        this.continueButtonUpdate();
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
            const { id, title, textOne, textTwo, amount, value } = pledge;
            const container = document.querySelector('.modal-pledge-container');
            const html = `
                            <div class="modal-pledge-item" data-id="${id}">
                                <label>
                                    <div class="modal-pledge-header">
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
                                <h1 class="left-amount ${id}">${amount} <span>left</span></h1>
                                <div class="modal-pledge-footer">
                                    <p>Enter your pledge</p>
                                    <div>
                                        <p>$ <span>${value}<span></p>
                                        <button class="btn continue" data-id=${id}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        `;
            container.insertAdjacentHTML('beforeend', html);
            if (amount < 1) {
                const items = document.querySelectorAll('.modal-pledge-item');
                items.forEach((item) => {
                    if (item.dataset.id === pledge.id) {
                        item.style.opacity = '0.5';
                        item.firstElementChild.firstElementChild.firstElementChild.disabled = true;
                    }
                });
            }
        });
    }
    checkboxModalUpdate() {
        const checkboxes = document.querySelectorAll('input[type=radio]');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                const items = document.querySelectorAll('.modal-pledge-item');
                items.forEach((item) => {
                    item.classList.remove('active');
                });
                items[index].classList.add('active');
            });
        });
    }
    bookmarkUpdate() {
        const bookmarkBtn = document.querySelector('#bookmark');
        if (localStorage.getItem('booked')) {
            bookmarkBtn.setAttribute('class', 'booked');
            bookmarkBtn.firstElementChild.src =
                './images/icon-bookmark-booked.svg';
        }
        bookmarkBtn.addEventListener('click', () => {
            if (!bookmarkBtn.classList.contains('booked')) {
                bookmarkBtn.setAttribute('class', 'booked');
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark-booked.svg';
                localStorage.setItem('booked', 'true');
            } else {
                bookmarkBtn.removeAttribute('class', 'booked');
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark.svg';
                localStorage.removeItem('booked');
            }
        });
    }
    closeSuccessModal() {
        const closeBtn = document.querySelector('.close-success');
        closeBtn.addEventListener('click', () => {
            this.successContainer.classList.remove('active');
        });
    }
    continueButtonUpdate() {
        const stat = new Stat();
        const pledge = new Pledge();
        const pledgesModal = document.querySelectorAll('.modal-pledge-item');
        const pledgesMain = [...document.querySelectorAll('.pledge')];
        const buttons = document.querySelectorAll('.continue');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.modalContainer.classList.toggle('active');
                this.successContainer.classList.add('active');
                const div = button.parentNode.parentNode.parentNode;
                const input = div.childNodes[1].childNodes[1].childNodes[1];
                pledgesModal.forEach((pledgeDOM) => {
                    if (pledgeDOM.dataset.id == button.dataset.id) {
                        pledges.forEach((item) => {
                            if (item.value == 0) return;
                            if (item.id == pledgeDOM.dataset.id) {
                                stats.amount += item.value;
                                stats.backers++;
                                item.amount--;
                                stat.update();
                                pledge.updatePledge(
                                    item.amount,
                                    pledgeDOM.dataset.id
                                );
                                div.classList.remove('active');
                                input.checked = false;
                                if (item.amount == 0) {
                                    div.style.opacity = '0.5';
                                    div.classList.remove('active');
                                    input.disabled = true;
                                    input.checked = false;
                                    button.disabled = true;

                                    pledgesMain.forEach((element) => {
                                        if (
                                            element.dataset.id ===
                                            pledgeDOM.dataset.id
                                        ) {
                                            element.style.opacity = '0.5';
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        div.classList.remove('active');
                        input.checked = false;
                    }
                });
            });
        });
    }
}

export default Modal;
