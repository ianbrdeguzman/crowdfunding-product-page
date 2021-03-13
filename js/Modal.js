import { pledges } from './pledges.js';
import { stats } from './stats.js';
import Pledge from './Pledge.js';
import Stat from './Stat.js';

class Modal {
    constructor() {
        this.modalBtn = document.querySelector('#modal-button');
        this.modalCloseBtn = document.querySelector('#modal-close');
        this.modalContainer = document.querySelector('.modal-container');
        this.successContainer = document.querySelector('.success-container');
    }
    update() {
        this.openCloseModal();
        this.displayModal();
        this.checkboxModalUpdate();
        this.bookmarkUpdate();
        this.closeSuccessModal();
        this.continueButtonUpdate();
    }
    openCloseModal() {
        // opens modal window
        this.modalBtn.addEventListener('click', () => {
            this.modalContainer.classList.toggle('active');
        });
        // close modal window
        this.modalCloseBtn.addEventListener('click', () => {
            this.modalContainer.classList.toggle('active');
        });
    }
    displayModal() {
        const container = document.querySelector('.modal-pledge-container');
        // if container child is greater than one remove last child
        while (container.children.length > 1) {
            container.removeChild(container.lastElementChild);
        }
        // loop over pledges data
        pledges.forEach((pledge) => {
            // deconstruct pledge data
            const { id, title, textOne, textTwo, amount, value } = pledge;
            // if id is none dont show
            if (id == 'none') return;
            // create new modal pledge item
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
            // insert into page new modal pledge item
            container.insertAdjacentHTML('beforeend', html);
            // if amount of pledge item is 0
            if (amount < 1) {
                const items = document.querySelectorAll('.modal-pledge-item');
                // loop over modal pledge item
                items.forEach((item) => {
                    // if item id and pledge id is the same
                    if (item.dataset.id === pledge.id) {
                        // disable modal pledge item
                        item.style.opacity = '0.5';
                        item.firstElementChild.firstElementChild.firstElementChild.disabled = true;
                    }
                });
            }
        });
    }
    checkboxModalUpdate() {
        const checkboxes = document.querySelectorAll('input[type=radio]');
        // loop over checkboxes
        checkboxes.forEach((checkbox, index) => {
            // add event listeners to checkbox
            checkbox.addEventListener('change', () => {
                // get all modal pledge items
                const pledgesModal = document.querySelectorAll(
                    '.modal-pledge-item'
                );
                // loop over modal pledge items
                pledgesModal.forEach((pledge) => {
                    // remove all modal pledge active state
                    pledge.classList.remove('active');
                });
                // activate modal pledge state
                pledgesModal[index].classList.add('active');
            });
        });
    }
    bookmarkUpdate() {
        const bookmarkBtn = document.querySelector('#bookmark');
        // check if page is already booked
        if (localStorage.getItem('booked')) {
            // add booked class
            bookmarkBtn.setAttribute('class', 'booked');
            // change bookmark icon
            bookmarkBtn.firstElementChild.src =
                './images/icon-bookmark-booked.svg';
        }
        // add event listener to bookmark button
        bookmarkBtn.addEventListener('click', () => {
            // if button doesnt contain booked class
            if (!bookmarkBtn.classList.contains('booked')) {
                // add booked class
                bookmarkBtn.setAttribute('class', 'booked');
                // change bookmark icon
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark-booked.svg';
                // save to local storage
                localStorage.setItem('booked', 'true');
            } else {
                // remove booked class
                bookmarkBtn.removeAttribute('class', 'booked');
                // change bookmark icon
                bookmarkBtn.firstElementChild.src =
                    './images/icon-bookmark.svg';
                // remove from local storage
                localStorage.removeItem('booked');
            }
        });
    }
    closeSuccessModal() {
        const closeBtn = document.querySelector('.close-success');
        // closes success modal window
        closeBtn.addEventListener('click', () => {
            this.successContainer.classList.remove('active');
        });
    }
    continueButtonUpdate() {
        const P = new Pledge();
        const S = new Stat();
        const continueBtns = document.querySelectorAll('.continue');
        // loop over continue buttons
        continueBtns.forEach((button) => {
            // add event listener to button
            button.addEventListener('click', (e) => {
                // close pledges modal window
                this.modalContainer.classList.toggle('active');
                // open success modal window
                this.successContainer.classList.add('active');
                // loop over pledges
                pledges.forEach((pledge) => {
                    // if target id is none return
                    if (e.target.dataset.id == 'none') return;
                    // check target id and pledge id
                    if (e.target.dataset.id == pledge.id) {
                        // increase stats amount
                        stats.amount += pledge.value;
                        // increase backers
                        stats.backers++;
                        // decrease pledge amount
                        pledge.amount--;
                        // update pledges on main page
                        P.displayPledge();
                        // update stats on main page
                        S.update();
                        // update pledges on modal window
                        this.displayModal();
                        // update button event listeners
                        this.continueButtonUpdate();
                        // update checkbox event listeners
                        this.checkboxModalUpdate();
                    }
                });
            });
        });
    }
}

export default Modal;
