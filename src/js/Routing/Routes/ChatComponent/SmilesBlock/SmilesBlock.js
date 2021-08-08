import './SmilesBlock.scss';

export default class SmilesBlock {
  constructor(root, input, symbolsOuptput) {
    this.root = root;
    this.input = input;
    this.symbolsOuptput = symbolsOuptput;

    this.smileStartString = '1285';
    this.smilesRange = [12, 80];

    this.setupListeners();
  }

  render() {
    this.root.classList.add('smiles');

    const range = this.smilesRange;

    for (let i = range[0]; i <= range[1]; i++) {
      const smile = document.createElement('span');
      smile.classList.add('smile');
      smile.innerHTML = `&#${this.smileStartString}${i}`;

      this.root.append(smile);
    }
  }

  setupListeners() {
    this.root.addEventListener('click', e => {
      if (e.target.classList[0] !== 'smile') return;

      this.input.value += e.target.textContent;
      this.symbolsOuptput.textContent = this.input.value.length;
    });
  }
}
