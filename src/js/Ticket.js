class Ticket {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status || false;
    this.created = created;
  }
}

module.exports = {
  Ticket,
};
