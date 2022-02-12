const { v4: uuidv4 } = require('uuid');

class Ticket {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status || false;
    this.created = created;
  }
}

class TicketFull extends Ticket {
  constructor(name, description) {
    super(name);

    this.id = uuidv4();
    this.name = name;
    this.status = false;
    this.created = new Date().toLocaleString();
    this.description = description || '';
  }
}

module.exports = {
  Ticket,
  TicketFull,
};
