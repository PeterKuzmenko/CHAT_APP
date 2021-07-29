import Component from "../Component";
import Loader from "../../chat-functions/Loader";
import { router } from "../..";

import avatars from "../../chat-functions/getAvatars";
import getLocalUser from "../../chat-functions/getLocalUser";

export default class ChatComponent extends Component {
    constructor() {
        super();
        this.anchor = document.createElement('div');

        this.localUsersLength = 0;
        this.localMessagesLength = 0;
        this.prevAuthorMessage = '';
        this.messagesFromOneAuthor = document.createElement('div');
        this.messagesFromOneAuthor.classList.add('messages-from-one-author');
    }

    render() {
        return `
            <div id="wrapper">
                <header>
                    <a href="#" class="logo">Just Chat</a>
                    <div class="personal-info">
                        <div class="time-block">
                            <p class="online">Time online: <span id="time-online">0s</span></p>
                            <p class="online">Your local time: <span id="local-time"></span></p>
                        </div>
                        <div class="profile">
                            <a href="#">Edit personal info</a>
                            <a href="#">Private messages (<span class="amount-pritvate-messages">3</span>)</a>
                        </div>
                        <input type="button" value="logout" id="logout-btn">
                    </div>
                </header>
                <main>
                    <div class="chat-block">
                        <div class="users-block">
                            <h3>Users: </h3>
                            <ul id="users"></ul>
                        </div>
                        <div class="chat">
                            <ul class="select-chat">
                                <li><a href="#" class="active">Main chat</a></li>
                            </ul>
                            <div class="chat-content" id="messages"></div>
                            <div class="create-message">
                                <textarea id="input"></textarea>
                                <input id="send" type="button" value="Send Message">
                                <div class="edit-panel">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `
    } 

    setupListeners() {
        this.messagesOutput = document.getElementById('messages');
        this.usersOutput = document.getElementById('users');

        const messageLoader = new Loader(this.messagesOutput);
        const usersLoader = new Loader(this.usersOutput);
        
        messageLoader.render();
        usersLoader.render();

        this.timeInfo();
        this.logoutListener();
        this.sendMessageListener();

        this.fetchData(usersLoader, messageLoader);
        setInterval(this.fetchData.bind(this), 2500);
    } 

    logoutListener() {
        const logoutBtn = document.getElementById('logout-btn');

        logoutBtn.addEventListener('click', () => {
            const ask = confirm('Are you sure that you want to exit?');

            if (ask) {
                const user = getLocalUser();

                fetch('https://studentschat.herokuapp.com/users/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user.username
                    })
                })
                    .then((res) => {
                        if (res.status === 200) {
                            window.localStorage.removeItem('user');
                            router.changeRoute('login');
                        }
                    })
                    .catch(e => console.log(e))
            }
        })
    }

    sendMessageListener() {
        const sendBtn = document.getElementById('send');
        const input = document.getElementById('input');

        sendBtn.addEventListener('click', e => {
            if (!input.value) return;

            const value = input.value;
            input.value = '';

            const datetime = new Date().toISOString();
            const myAccount = getLocalUser();

            fetch('https://studentschat.herokuapp.com/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: value,
                        username: myAccount.username, 
                        datetime
                    })
                })
                    .then(res => res.json())
                    .then(() => {
                        this.fetchData.apply(this);
                    })
        })
    }

    fetchData(...loaders) {
        fetch('https://studentschat.herokuapp.com/users')
            .then(data => data.json())
            .then(users => {
                if (loaders.length) {
                    loaders[0].removeLoader();
                }

                for (let i = this.localUsersLength; i < users.length; i++) {
                    const user = users[i];

                    const userElement = document.createElement('li');
                    const ava = user.avatarId ? avatars[user.avatarId] : avatars.default;

                    userElement.innerHTML = `
                        <a href="#${user.username}" class=${user.status}>
                            <img class="ava" src=${ava}>
                            ${user.username}
                        </a>
                    `;
                    this.usersOutput.append(userElement);
                }
                
                this.localUsersLength = users.length;

                fetch('https://studentschat.herokuapp.com/messages')
                    .then(data => data.json())
                    .then(messages => {
                        if (loaders.length) {
                            loaders[1].removeLoader();
                        }

                        const myAccount = getLocalUser();

                        for (let i = this.localMessagesLength; i < messages.length; i++) {
                            const message = messages[i];
                            const user = users.find((item) => item.username === message.username);

                            const messageElement = document.createElement('div');
                            messageElement.classList.add('message');

                            if (this.prevAuthorMessage === message.username) {
                                messageElement.innerHTML = `<p>${message.message}</p>`;

                                this.messagesFromOneAuthor.append(messageElement);
                            } else {
                                this.messagesOutput.append(this.messagesFromOneAuthor);

                                this.messagesFromOneAuthor = document.createElement('div');
                                this.messagesFromOneAuthor.classList.add('messages-from-one-author');

                                if (message.username === myAccount.username) {
                                    this.messagesFromOneAuthor.classList.add('my-messages');

                                    messageElement.innerHTML = `<p>${message.message}</p>`;
                                } else {
                                    const ava = document.createElement('a');
                                    const avaSource = user.avatarId ? avatars[user.avatarId] : avatars.default;
                                    ava.classList.add('ava');
                                    ava.innerHTML = `<img src=${avaSource}>`;
                                    ava.href = `#${message.username}`;
                                    this.messagesFromOneAuthor.append(ava);

                                    console.log(this.messagesFromOneAuthor);

                                    messageElement.innerHTML = `
                                        <a href="#${message.username}" class="name-author">${message.username}</a> 
                                        <p>${message.message}</p>
                                    `;
                                }
                                
                                this.messagesFromOneAuthor.append(messageElement);
                            }

                            if (i === messages.length - 1) {
                                this.messagesOutput.append(this.messagesFromOneAuthor);
                            }

                            this.prevAuthorMessage = message.username;
                        }

                        if (this.localMessagesLength !== messages.length) {
                            this.messagesOutput.scrollTo({
                                top: 100000,
                                behavior: 'smooth'
                            })
                        }

                        this.localMessagesLength = messages.length;
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    timeInfo() {
        const timeOnlineOutput = document.getElementById('time-online');
        let timeOnlineSeconds = 0;
        
        setInterval(() => {
            timeOnlineSeconds++;
            let value = '';

            if (timeOnlineSeconds < 60) {
                value = `${timeOnlineSeconds}s`;
            } else if (timeOnlineSeconds >= 60 && timeOnlineSeconds < 3600) {
                const timeOnlineMinutes = Math.floor(timeOnlineSeconds / 60);
                value = `${timeOnlineMinutes}m ${timeOnlineSeconds%60}s`;
            } else {
                const timeOnlineMinutes = Math.floor(timeOnlineSeconds%3600 / 60);
                const timeOnlineHours = Math.floor(timeOnlineSeconds / 3600);
                value += `${timeOnlineHours}h`;
                value += timeOnlineMinutes ? ` ${timeOnlineMinutes}m` : '';
            }

            timeOnlineOutput.innerHTML = value
        }, 1000);

        const localTimeOutput = document.getElementById('local-time');

        const now = new Date();
        localTimeOutput.innerHTML = `${now.getHours()}h ${now.getMinutes()}m`

        setInterval(() => {
            const now = new Date();
            
            localTimeOutput.innerHTML = `${now.getHours()}h ${now.getMinutes()}m`
        }, 60000);
    }
}