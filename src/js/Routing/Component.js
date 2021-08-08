import {router} from '../index';

export default class Component {
  get dom() {
    const buildComponent = async () => {
      this.anchor.innerHTML = await this.render();
      this.setupListeners();
    };
    
    buildComponent();

    return this.anchor;
  }

  addLinkHandler() {
    document.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', this.linkTo.bind(this));
    });
  }

  linkTo(e) {
    e.preventDefault();
    router.changeRoute(e.target.dataset.linkTo);
  }
}
