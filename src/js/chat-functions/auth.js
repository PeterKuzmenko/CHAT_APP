import { router } from "../index";
import { CHAT_API_URL } from "../constants";

export default function auth(type, values) {
    fetch(`${CHAT_API_URL}/users/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
        .then((res) => {
            if (res.status !== 200) {
                const alert = document.getElementById('alert');

                if (type === 'login') {
                    alert.textContent = 'Wrong login or password!';
                    alert.classList.add('show');
                } else {
                    alert.textContent = 'This user is already exist!';
                    alert.classList.add('show');
                }

                throw 'Something went wrong';
            }

            return res.json();
        })
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            router.changeRoute('main');
        })
        .catch(e => {
            console.log(e);
        }) 
}