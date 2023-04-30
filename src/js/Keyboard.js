import Output from './Output';
import dataEng from './dataEng';
import dataRus from './dataRus';

export default class Keyboard {
  constructor() {
    this.futctionalKeys = ['Shift', 'Control', 'Alt', 'CapsLock'];
    this.isShift = false;
    this.isControl = false;
    this.isAlt = false;
    this.isCapsLock = false;
    this.setLayout();
    this.keyboard = document.querySelector('.keyboard');
    this.output = new Output();
    this.keyboard.onclick = (e) => this.clickHandler(e.target);
    document.body.addEventListener('keydown', (e) => this.keyboardHandler(e));
    document.body.addEventListener('keyup', (e) => this.keyboardHandler(e));
    this.render();
  }

  render() {
    this.keyboard.innerHTML = this.data.map((row, idx) => `
      <div class="row row-${idx + 1}">${row.map(({
  value, altValue, title, className,
}) => `<div value="${value}" altValue="${altValue}" class="${className}">${title}</div>`).join('')}</div>
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
      this.layoutHelper(target);
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
    if (value === 'Win') {
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
    const virtualKey = document.querySelector(`.${e.code}`);
    if (!virtualKey) {
      return;
    }
    e.preventDefault();
    const value = virtualKey.getAttribute('value');
    if (this.futctionalKeys.includes(value)) {
      if (e.type === 'keyup' && value === 'CapsLock') {
        return;
      }
      if (e.type === 'keydown') {
        this.layoutHelper(virtualKey);
      }
      this.functionalKeysHandler(virtualKey, e.type);
    } else {
      virtualKey.classList.toggle('active');
      if (e.type === 'keydown') {
        this.clickHandler(virtualKey);
      }
    }
  }

  layoutHelper(target) {
    const value = target.getAttribute('value');
    if ((this.isAlt && value === 'Control') || (this.isControl && value === 'Alt')) {
      this.toggleLayout();
      this.isAlt = false;
      this.isControl = false;
      this.isShift = false;
      this.isCapsLock = false;
    }
  }

  functionalKeysHandler(target, type) {
    const value = target.getAttribute('value');
    target.classList.toggle('active');
    switch (value) {
      case 'Shift':
        this.isShift = !this.isShift;
        break;
      case 'Control':
        if (type === 'keyup') {
          target.classList.remove('active');
          this.isControl = false;
          break;
        }
        this.isControl = !this.isControl;
        break;
      case 'Alt':
        if (type === 'keyup') {
          target.classList.remove('active');
          this.isAlt = false;
          break;
        }
        this.isAlt = !this.isAlt;
        break;
      case 'CapsLock':
        this.isCapsLock = !this.isCapsLock;
        break;
      default:
        throw new Error(`No expected key ${value} here`);
    }
  }

  setLayout() {
    const layout = localStorage.getItem('layout');
    if (!layout || layout === 'eng') {
      this.data = dataEng;
      this.layout = 'eng';
    } else {
      this.data = dataRus;
      this.layout = 'rus';
    }
  }

  toggleLayout() {
    if (this.layout === 'eng') {
      this.data = dataRus;
      this.layout = 'rus';
      localStorage.setItem('layout', 'rus');
    } else {
      this.data = dataEng;
      this.layout = 'eng';
      localStorage.setItem('layout', 'eng');
    }
    this.render();
  }
}
