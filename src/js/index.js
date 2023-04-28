import '../scss/main.scss';
import Keyboard from './Keyboard';
import dataEng from './dataEng';

document.body.insertAdjacentHTML('beforeend', `
  <div class="wrapper">
      <div class="legend"></div>
      <div class="output"></div>
      <div class="keyboard"></div>
  </div>
`);

const keyboard = new Keyboard(dataEng);
