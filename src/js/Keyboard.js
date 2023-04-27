export default class Keyboard {
  constructor(data) {
    this.data = data;
    this.keyboard = document.querySelector('.keyboard');
    this.render();
  }

  render() {
    this.keyboard.innerHTML = this.data.map((row, idx) => `
      <div class="row row-${idx + 1}">${row.map((key) => `
        <div value="${key.value}" class="${key.className}">${key.title}</div>
      `).join('')}</div>
    `).join('');
  }
}
