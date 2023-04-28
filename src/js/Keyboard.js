import Output from './Output';

export default class Keyboard {
  constructor(data) {
    this.futctionalKeys = ['Shift', 'Control', 'Alt', 'CapsLock'];
    this.isShift = false;
    this.isControl = false;
    this.isAlt = false;
    this.isCapsLock = false;
    this.data = data;
    this.keyboard = document.querySelector('.keyboard');
    this.output = new Output();
    this.keyboard.onclick = (e) => this.clickHandler(e.target);
    document.body.addEventListener('keydown', (e) => this.keyboardHandler(e));
    this.render();
  }

  render() {
    this.keyboard.innerHTML = this.data.map((row, idx) => `
      <div class="row row-${idx + 1}">${row.map((key) => `
        <div value="${key.value}" altValue="${key.altValue}" class="${key.className}">${key.title}</div>
      `).join('')}</div>
    `).join('');
  }

  clickHandler(target) {
    if (!target.closest('[value]')) {
      return;
    }
    const value = target.closest('[value]').getAttribute('value');
    const altValue = target.closest('[altValue]').getAttribute('altValue');
    if (this.futctionalKeys.includes(value)) {
      this.functionalKeysHandler(target);
      return;
    }
    if (value === 'Backspace') {
      this.output.backspace();
      return;
    }
    if (value === 'Delete') {
      this.output.delete();
      return;
    }
    if (this.isShift || this.isCapsLock) {
      if (this.isShift && this.isCapsLock) {
        this.output.addSymbol(value);
      } else {
        this.output.addSymbol(altValue);
      }
    } else {
      this.output.addSymbol(value);
    }
  }

  keyboardHandler(e) {
    console.log(e);
  }

  functionalKeysHandler(target) {
    target.classList.toggle('active');
    switch (target.getAttribute('value')) {
      case 'Shift':
        this.isShift = !this.isShift;
        break;
      case 'Control':
        this.isControl = !this.isControl;
        break;
      case 'Alt':
        this.isAlt = !this.isAlt;
        break;
      case 'CapsLock':
        this.isCapsLock = !this.isCapsLock;
        break;
      default:
        throw new Error(`No expected key ${target.getAttribute('value')} here`);
    }
  }
}
