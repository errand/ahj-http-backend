const uuid = require('uuid');
const Ticket = require('./Ticket');

class TicketFull extends Ticket {
  constructor(name, description) {
    super(name);

    this.id = uuid;
    this.name = name;
    this.status = false;
    this.created = new Date().toLocaleString();
    this.description = description || '';
  }
}

module.exports = {
  TicketFull,
};
