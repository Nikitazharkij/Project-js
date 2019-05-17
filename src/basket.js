export class Basket {
    constructor() {
        this.cartInfo = document.getElementById('cart-info');
        this.find();
    }

    find() {
        this.cartInfo.addEventListener('click', () => {
            console.log('Hi');
        });
    }
}
