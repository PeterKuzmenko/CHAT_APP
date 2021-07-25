import Component from "../Component";
import createMessage from "../../chat-functions/createMessage";
//import ava from '../images/custom-ava.png';

export default class ChatComponent extends Component {
    constructor(anchor) {
        super()
        this.anchor = document.createElement('div')
    }

    onInit() {
        console.log('MainComponent init')
    }

    render() {
        return `
            <div id="wrapper">
                <header>
                    <a href="#" class="logo">Name Chat</a>
                    <div class="personal-info">
                        <div class="time-block">
                            <p class="online">Time online: <span class="time-online-value">1h 30m</span></p>
                            <p class="online">Your local time: <span class="local-time">1h 30m</span></p>
                        </div>
                        <div class="profile">
                            <a href="#">Edit personal info</a>
                            <a href="#">Private messages (<span class="amount-pritvate-messages">3</span>)</a>
                        </div>
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
                                <li><a href="#">Chat with Alison (<span class="unread-messages">2</span>)</a></li>
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
        const messagesOutput = document.getElementById('messages');
        const usersOutput = document.getElementById('users');

        const sendBtn = document.getElementById('send');
        const input = document.getElementById('input');

        sendBtn.addEventListener('click', e => {
            if (!input.value) return;

            const value = input.value;
            input.value = '';

            const datetime = new Date().toISOString();
            const [user] = JSON.parse(window.localStorage.getItem('user'));

            fetch('https://studentschat.herokuapp.com/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: value,
                        username: user.username, 
                        datetime
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        createMessage(user, value, messagesOutput);
                    })
        })

        fetch('https://studentschat.herokuapp.com/users')
            .then(data => data.json())
            .then(users => {
                users.forEach(user => {
                    const userElement = document.createElement('li');
                    userElement.innerHTML = `
                        <a href="#${user.username}:${user.id}" class=${user.status}>
                            ${user.username}
                        </a>
                    `;
                    usersOutput.append(userElement);
                })

                fetch('https://studentschat.herokuapp.com/messages')
                    .then(data => data.json())
                    .then(messages => {
                        messages.forEach(message => {
                            const user = users.find((item) => item.username === message.username);

                            createMessage(user, message.message, messagesOutput);
                        })
                    })
            })
    } 
}