import Pledge from './Pledge.js';
import Menu from './Menu.js';
import Modal from './Modal.js';
import Stat from './Stat.js';

const pledge = new Pledge();
const menu = new Menu();
const modal = new Modal();
const stat = new Stat();

pledge.update();
menu.update();
modal.update();
stat.update();
