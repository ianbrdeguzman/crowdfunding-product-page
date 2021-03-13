import { pledges } from './pledges.js';
import { stats } from './stats.js';
import Stat from './Stat.js';
import Modal from './Modal.js';

class Pledge {
    update() {
        this.displayPledge();
        this.pledgeButtonUpdate();
    }
    displayPledge() {
        // get main page pledge container
        const container = document.querySelector('.pledge-container');
        // clear container
        container.innerHTML = '';
        // loop pledges data
        pledges.forEach((pledge) => {
            // deconstruct pledge data
            const { id, title, textOne, textTwo, amount } = pledge;
            // if id of pledge is none dont show
            if (id == 'none') return;
            const html = `
                <div class="pledge ${id}" data-id="${id}">
                    <div class="pledge-header">
                        <h4>${title}</h4>
                        <p class="pledge-amount">${textOne}</p>
                    </div>
                    <p class="pledge-info">${textTwo}</p>
                    <div class="pledge-footer">
                        <h1 class="left-amount ${id}">${amount} <span>left</span></h1>
                        <button data-id="${id}" class="btn pledge-button">Select Reward</button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
            if (amount < 1) {
                const items = document.querySelectorAll('.pledge');
                items.forEach((item) => {
                    if (item.dataset.id === pledge.id) {
                        item.style.opacity = '0.5';
                        item.lastElementChild.disabled = true;
                    }
                });
            }
        });
        this.pledgeButtonUpdate();
    }
    // updatePledge(amount, id) {
    //     const leftAmount = document.querySelectorAll('.left-amount');
    //     leftAmount.forEach((item) => {
    //         if (item.parentElement.dataset.id === id) {
    //             item.innerHTML = `${amount} <span>left</span`;
    //         }
    //     });
    // }
    pledgeButtonUpdate() {
        // create new Stat instance
        const S = new Stat();
        // create new Modal instance
        const M = new Modal();
        // get all main page pledge buttons
        const pledgeBtns = document.querySelectorAll('.pledge-button');
        // loop all main page pledge buttons
        pledgeBtns.forEach((button) => {
            // add event listener for each button
            button.addEventListener('click', () => {
                // get success modal
                const successModal = document.querySelector(
                    '.success-container'
                );
                // loop pledges data
                pledges.forEach((pledge) => {
                    // check if pledge id, button id and pledge amount greater than 0
                    if (pledge.id === button.dataset.id && pledge.amount > 0) {
                        // increase stats amount equal to pledge value
                        stats.amount += pledge.value;
                        // increase backers
                        stats.backers++;
                        // decrease pledge amount
                        pledge.amount--;
                        // update main page pledges
                        this.displayPledge();
                        // update main page stats
                        S.update();
                        // update modal page pledges
                        M.displayModal();
                        // update modal buttons
                        M.continueButtonUpdate();
                        M.checkboxModalUpdate();
                        // activate success modal
                        successModal.classList.add('active');
                    }
                });
            });
        });
    }
}

export default Pledge;
