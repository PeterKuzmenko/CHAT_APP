import './PersonalInfo.scss';

import Component from '../../Component';
import {router} from '../../../index';

import {CHAT_API_URL} from '../../../constants';
import avatars from '../../../chat-functions/getAvatars';
import getLocalUser from '../../../chat-functions/getLocalUser';

export default class PersonalInfo extends Component {
  constructor() {
    super();
    this.anchor = document.createElement('div');
  }

  render() {
    return `
      <div class="personal-info-block">
        <h1>Personal Info</h1>
        <div class="info">
          <div class="block-info">
            <div id="ava"></div>
            <h2 id="username"></h2>
          </div>
          <div class="block-info">
            <p>Phone: <span id="phone"></span></p>
            <p>Email: <span id="mail"></span></p>
          </div>
          <div class="block-info">
            <p>Country: <span id="country"></span></p>
            <p>Bio: <span id="about"></span></p>
          </div>
        </div>
        <a href="#" data-link-to="main" class="back-btn">Back</a>
      </div>
    `;
  }

  setupListeners() {
    this.addLinkHandler();

    const avaBlock = document.getElementById('ava');

    const localUser = getLocalUser();

    const avaSource = localUser.avatarId 
      ? avatars[localUser.avatarId] 
      : avatars.default;
    const avaImage = document.createElement('img');
    avaImage.src = avaSource;
    
    avaBlock.append(avaImage);

    const outputs = [
      document.getElementById('username'),
      document.getElementById('phone'),
      document.getElementById('mail'),
      document.getElementById('country'),
      document.getElementById('about')
    ];

    outputs.forEach(item => {
      item.textContent = localUser[item.id];
    });
  }
}