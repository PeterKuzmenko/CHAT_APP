const mainPage = `
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
                    <ul id="users"></ul>
                </div>
                <div class="chat">
                    <ul class="select-chat">
                        <li><a href="#" class="active">Main chat</a></li>
                        <li><a href="#">Chat with Alison (<span class="unread-messages">2</span>)</a></li>
                    </ul>
                    <div class="chat-content">
                        <div class="message">
                            <a href="#" class="user">John Snow: </a>
                            <p>Hi, how is the weather there?</p>
                        </div>
                    </div>
                    <div class="create-message">
                        <textarea></textarea>
                        <input class="send" type="submit" value="Send Message">
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

export default mainPage;