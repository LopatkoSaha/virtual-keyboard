import '../scss/main.scss';
import Keyboard from './Keyboard';

document.body.insertAdjacentHTML('beforeend', `
  <div class="wrapper">
    <div class="legend">
      <p>Клавиатура разработана для OS Windows</p>
      <p>Переключение раскладки сочетанием  Ctrl + Alt</p>
    </div>
    <div class="output"></div>
    <div class="keyboard"></div>
  </div>
`);

// eslint-disable-next-line no-new
new Keyboard();
