class Ui {
  constructor() {
    this.container = null;
    this.addTicketButton = null;
    this.addTicketClickListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();
    const ticketsSection = document.createElement('div');
    ticketsSection.classList.add('tickets');
    ticketsSection.innerHTML = `
      <div class="tickets--header">
        <button type="button" data-id="addTicket">Добавить тикет</button>
      </div>
      <div class="tickets-list"></div>
    `;
    this.addTicketButton = ticketsSection.querySelector('[data-id="addTicket"]');
    this.addTicketButton.addEventListener('click', evt => this.onAddTicketClick(evt));

    this.container.appendChild(ticketsSection);
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addTicketClickListener(callback) {
    this.addTicketClickListeners.push(callback);
  }

  onAddTicketClick(event) {
    this.addTicketClickListeners.forEach(o => o.call(null, event));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('UI not bind to DOM');
    }
  }
}

module.exports = Ui;
