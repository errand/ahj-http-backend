const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');

class TicketController {
  constructor() {
    this.tickets = [];
    this.descriptions = [];
  }

  allTickets() {
    this.shortTickets = this.tickets.map(
      elem => new Ticket(elem.id, elem.name, elem.status, elem.created),
    );
    return this.shortTickets;
  }

  getStartedTickets() {
    const ticket1 = new TicketFull('name', 'description');

    this.tickets.push(ticket1);
    return this.tickets;
  }

  createTicket(object) {
    const data = JSON.parse(object);

    const ticket = new TicketFull(data.name, object.description);
    const description = { id: ticket.id, description: data.description };
    this.descriptions.push(description);
    this.tickets.push(ticket);

    return ticket;
  }

  getIndexId(id) {
    const index = this.tickets.findIndex((elem) => elem.id === id);
    return index;
  }

  getTicketById(id) {
    const ticket = this.descriptions.find((elem) => elem.id === id);

    return ticket;
  }

  deleteTicket(id) {
    const item = this.getIndexId(id);
    return !!this.tickets.splice(item, 1);
  }

  toggleStatusTicket(id) {
    const index = this.getIndexId(id);
    const item = this.tickets[index];

    item.status === false ? (item.status = true) : (item.status = false);

    return item.status;
  }

  editTicket(object) {
    const data = JSON.parse(object);

    const index = this.getIndexId(data.id);

    const item = this.tickets[index];

    item.name = data.name;
    item.description = data.description;
    const ticketDescription = this.descriptions.find(
      (elem) => elem.id === data.id,
    );
    ticketDescription.description = data.description;

    return item;
  }
}

module.exports = {
  TicketController,
};
