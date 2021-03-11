import { pledges } from './pledges.js';

class Pledge {
    update() {
        this.displayPledge();
        this.pledgeButton();
    }
    displayPledge() {
        pledges.forEach((pledge) => {
            if (pledge.id == 'none') return;
            const { id, title, textOne, textTwo, amount } = pledge;
            const container = document.querySelector('.pledge-container');
            const html = `
                <div class="pledge ${id}">
                    <h4>${title}</h4>
                    <p class="pledge-amount">${textOne}</p>
                    <p class="pledge-info">${textTwo}</p>
                    <h1 class="left-amount">${amount} <span>left</span></h1>
                    <button class="pledge-button">Select Reward</button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }
    pledgeButton() {
        const pledgeBtns = document.querySelectorAll('.pledge-button');
        pledgeBtns.forEach((button) => {
            button.addEventListener('click', () => {
                console.log('pledge');
            });
        });
    }
}

export default Pledge;
