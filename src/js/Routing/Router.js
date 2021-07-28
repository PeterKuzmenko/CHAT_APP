import ChatComponent from "./Routes/ChatComponent";
import LoginComponent from "./Routes/LoginComponent";
import RegisterComponent from "./Routes/RegisterComponent";

const routerConfig = {
    'main': {
        data: {},
        component: ChatComponent
    },
    'login': {
        data: {},
        hash: 'login',
        component: LoginComponent
    }
    ,
    'register': {
        data: {},
        hash: 'register',
        component: RegisterComponent
    }
}


export default class Router {
    constructor(anchor) {
        this.anchor = anchor;
    }

    changeRoute(route) {
        const conf = routerConfig[route];

        if (!conf) return;

        if (conf.hash) {
            window.location.hash = conf.hash;
        } else {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }

        const component = new conf.component();

        const dom = component.dom;

        //if (this.currentDomComponent)
        this.anchor.innerHTML = '';
        this.anchor.appendChild(dom);
        //this.currentDomComponent = dom
    }
}