import { pledges } from './pledges.js';
import { stats } from './stats.js';
import Stat from './Stat.js';

class Pledge {
    update() {
        this.displayPledge();
        this.pledgeButtonUpdate();
    }
    displayPledge() {
        this.pledges = pledges;
        this.pledges.forEach((pledge) => {
            const { id, title, textOne, textTwo, amount } = pledge;
            const container = document.querySelector('.pledge-container');
            const html = `
                <div class="pledge ${id}" data-id="${id}">
                    <h4>${title}</h4>
                    <p class="pledge-amount">${textOne}</p>
                    <p class="pledge-info">${textTwo}</p>
                    <h1 class="left-amount ${id}">${amount} <span>left</span></h1>
                    <button data-id="${id}" class="btn pledge-button">Select Reward</button>
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
    }
    updatePledge(amount, id) {
        const leftAmount = document.querySelectorAll('.left-amount');
        leftAmount.forEach((item) => {
            if (item.parentElement.dataset.id == id) {
                item.innerHTML = `${amount} <span>left</span>`;
            }
        });
    }
    pledgeButtonUpdate() {
        const stat = new Stat();
        const pledgeBtns = document.querySelectorAll('.pledge-button');
        pledgeBtns.forEach((button) => {
            button.addEventListener('click', () => {
                const successModal = document.querySelector(
                    '.success-container'
                );
                pledges.forEach((pledge) => {
                    if (pledge.id === button.dataset.id && pledge.amount > 0) {
                        stats.amount += pledge.value;
                        stats.backers++;
                        pledge.amount--;
                        this.updatePledge(pledge.amount, button.dataset.id);
                        stat.update();
                        successModal.classList.add('active');
                        if (pledge.amount == 0) {
                            button.parentElement.style.opacity = '0.5';
                        }
                    }
                });
            });
        });
    }
}

export default Pledge;
