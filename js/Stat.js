import { stats } from './stats.js';

class Stat {
    update() {
        this.displayStat();
        this.progressUpdate();
    }
    displayStat() {
        const amountRaised = document.querySelector('#amount-raised');
        const totalBackers = document.querySelector('#total-backers');
        const daysLeft = document.querySelector('#days-left');

        amountRaised.textContent = `$${stats.amount.toLocaleString()}`;
        totalBackers.textContent = `${stats.backers.toLocaleString()}`;
        daysLeft.textContent = `${stats.left.toLocaleString()}`;
    }
    progressUpdate() {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = `${Math.floor(stats.amount / 1000)}%`;
    }
}

export default Stat;
