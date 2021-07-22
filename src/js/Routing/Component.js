import {router} from '../index'

export default class Component {
    get dom() {
        this.anchor.innerHTML = this.render()
        let i = 0
        const someFunction = () => {
            i++
            if (i === 2) {
                this.setupListeners()
                document.body.removeEventListener('DOMSubtreeModified', someFunction )
            }
        }
        document.body.addEventListener('DOMSubtreeModified', someFunction)

        return this.anchor
    }

    addLinkHandler() {
        document.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', (e) => {
                router.changeRoute(e.target.dataset.linkTo);
            })
        })
    }
}