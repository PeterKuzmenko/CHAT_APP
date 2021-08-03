export default class Loader {
  constructor(root) {
    this.root = root;
    this.anchor = document.createElement('div');
  }

  render() {
    this.anchor.classList.add('loader');
    this.anchor.innerHTML = `
      <div class="lds-default">
        <div></div><div></div><div></div>
        <div></div><div></div><div></div>
        <div></div><div></div><div></div>
        <div></div><div></div><div></div>
      </div>
    `;

    this.root.append(this.anchor);
  }

  removeLoader() {
    this.root.innerHTML = '';
  }
}