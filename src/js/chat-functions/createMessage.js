export default function createMessage(user, value, messagesOutput) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <a href="#${user.username}:${user.user_id}" class="user">${user.username}:</a>
        <p>${value}</p>
    `
    messagesOutput.append(messageElement);
}