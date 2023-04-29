export default class Output {
  constructor() {
    this.beforeCursor = [];
    this.afterCursor = [];
    this.output = document.querySelector('.output');
    this.output.onclick = (e) => this.clickHandler(e.target);
    this.render();
  }

  render() {
    this.output.innerHTML = `
      ${this.beforeCursor.map((item, idx) => this.renderItem(item, idx, true)).join('')}<span class="cursor"></span>${this.afterCursor.map((item, idx) => this.renderItem(item, idx, false)).join('')}
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(item, idx, isBefore) {
    if (item === '<br>') {
      return item;
    }
    return `<span data-idx="${idx}" data-position="${isBefore ? 'before' : 'after'}">${item}</span>`;
  }

  clickHandler(target) {
    if (!target.dataset.idx) {
      return;
    }
    if (target.dataset.position === 'before') {
      const newBefore = this.beforeCursor.slice(0, target.dataset.idx);
      this.afterCursor = this.beforeCursor.slice(target.dataset.idx).concat(this.afterCursor);
      this.beforeCursor = newBefore;
      this.render();
    } else {
      const newAfter = this.afterCursor.slice(target.dataset.idx);
      this.beforeCursor = this.beforeCursor.concat(this.afterCursor.slice(0, target.dataset.idx));
      this.afterCursor = newAfter;
      this.render();
    }
  }

  addSymbol(symbol) {
    this.beforeCursor.push(symbol);
    this.render();
  }

  delete() {
    this.afterCursor.shift();
    this.render();
  }

  backspace() {
    this.beforeCursor.pop();
    this.render();
  }
}
