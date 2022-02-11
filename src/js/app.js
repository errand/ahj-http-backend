const TicketController = require('./TicketController');
const Ui = require('./Ui');

const ui = new Ui();
ui.bindToDOM(document.querySelector('#app'));

const ctr = new TicketController(ui);
ctr.init();
console.log(ctr.getStartedTickets());
