export class Basket {
    constructor() {
        this.cartInfo = document.getElementById('cart-info');
        this.productButtons = document.querySelectorAll('.product-button');
        this.items = {};
        this.find();
    }

    find() {
        this.cartInfo.addEventListener('click', () => {
            console.log('Hi');
        });
    }

    addPriceList(){
        this.productButtons = document.querySelectorAll('.product-button');

        this.productButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            let price = event.target.nextElementSibling.textContent;
            let finalPrice = price.slice(0, -1);
            this.items.price = finalPrice;

            let nameItem = event.target.previousElementSibling.previousElementSibling.textContent;
            this.items.name = nameItem;

            let fullPath = event.target.parentElement.firstElementChild.firstElementChild.src;
            let path = fullPath.indexOf('images');
            let partPath = fullPath.slice(path);
            this.items.img = fullPath;
            console.log(this.items.img);

            const cartItem = document.createElement('div');
            cartItem.classList.add('items-list');
            cartItem.innerHTML = `
                    <img src="${this.items.img}"/>
                    <h3>${this.items.name}</h3>
                    <h4>${this.items.price}$</h4>
                    <div class="delete-icon fas fa-trash" data-id=""></div>
            `

            const cart = document.getElementById('cart-item');
            const total = document.getElementById('close-cart');
            cart.insertBefore(cartItem, total);

            // console.log(this.items);
        })
    });

    }

    // addPriceList(){
    //     console.log(this.productButtons);
    //     this.productButtons.forEach((button) => {
    //         button.addEventListener('click', (event) => {
    //             console.log(event.target.nextElementSibling.textContent);
    //         })
    //     })
    // }
// console.log(event.target.nextElementSibling.textContent);
}
