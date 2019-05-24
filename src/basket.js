export class Basket {
    constructor() {
        this.items = {};
        this.nameItems = [];
        this.count = 0;
        this.itemTotal = document.getElementById('item-total');
        this.itemCount = document.getElementById('item-count');
        this.spendMoney = document.getElementById('final-money');
        this.totalProducts = document.querySelector('.total-products');
        this.message = document.querySelector('.message');
        this.nameSweets = document.querySelectorAll('.sweets');
        this.buyItems();
    }

    addItemsInBasket(){
        const productsButtons = document.querySelectorAll('.product-button');

        productsButtons.forEach((button) => {
        button.addEventListener('click', (event) => {

            this.count++;

            let nameItem = event.target.previousElementSibling.previousElementSibling.textContent;

                let price = event.target.nextElementSibling.textContent;
                let finalPrice = price.slice(0, -1);
                this.items.price = parseInt(finalPrice);

            if (this.nameItems.indexOf(nameItem) === -1) {

                this.nameItems.push(nameItem);
                this.items.name = nameItem;

                let fullPath = event.target.parentElement.firstElementChild.firstElementChild.src;
                let path = fullPath.indexOf('images');
                let partPath = fullPath.slice(path);
                this.items.img = fullPath;

                const cartItem = document.createElement('div');
                cartItem.classList.add('items-list');
                cartItem.innerHTML = `
                        <img src="${this.items.img}"/>
                        <h3 class="count-products">0</h3>
                        <h3>${this.items.name}</h3>
                        <span class="price-item">${this.items.price}</span>
                        <span>$</span>
                        <div class="delete-icon fas fa-trash"></div>
                `

                const cart = document.getElementById('cart-item');
                const total = document.getElementById('close-cart');
                cart.insertBefore(cartItem, total);

            } else {
                const items = document.querySelectorAll('.items-list > h3');

                [...items].forEach((product) => {
                    if (product.textContent === nameItem) {
                        const productPrice = parseInt(product.nextElementSibling.textContent);
                        product.nextElementSibling.textContent = productPrice + this.items.price;
                    }
                });

                this.items.price += parseInt(finalPrice);
            }

            const items = document.querySelectorAll('.items-list > h3');

            [...items].forEach((product) => {
                if (product.textContent === nameItem) {
                    let countProduct = product.previousElementSibling;
                    let count = Number(product.previousElementSibling.textContent);
                    countProduct.textContent = count + 1;
                }
            });

            this.showTotals();

        })
    });

    }

    renderTotalProducts() {
        const pageTotal = document.querySelector('.total-products');
        pageTotal.classList.add('visible');

        const itemsList = document.querySelector('.items-list');

        if (!itemsList) {
            window.location.hash = '#';
        }
    }

    showTotals(){
        const total = [];
        const items = document.querySelectorAll('.price-item');

        items.forEach((item) => {
            total.push(parseInt(item.textContent));
        });

        let totalMoney = total.reduce((sum, current) => {
            return sum + current;
        }, 0);

        let finalMoney = totalMoney;

        this.itemTotal.textContent = finalMoney;
        this.spendMoney.textContent= finalMoney;
        this.itemCount.textContent = this.count;

        if (total.length === 0) {
            this.nameItems = [];
            setTimeout(this.homePage, 500);
        }
    }

    buyItems(){
        const totalButton = document.querySelector('.total-button');

        totalButton.addEventListener('click', (event) => {
            const itemsList = document.querySelectorAll('.total-products .items-list');

            // this.localStorage();

            this.itemTotal.textContent = 0;
            this.spendMoney.textContent= 0;
            this.itemCount.textContent = 0;
            this.nameItems = [];
            this.count = 0;

            itemsList.forEach((item) => {
                item.remove();
            });

            setTimeout(this.homePage, 500);
            setTimeout(this.showMessage.bind(this), 1000);
            setTimeout(this.hideMessage.bind(this), 3500);

        });

    }

    homePage(){
        window.location.hash = '#';
    }

    showMessage(){
        this.message.classList.add('visible');
    }

    hideMessage(){
        this.message.classList.remove('visible');
    }

    deleteItem(){
        // const nameSweets = document.querySelectorAll('.sweets');
        const sweetsName = document.querySelectorAll('.sweets h2');

        this.totalProducts.addEventListener('click', (event) => {

            if (event.target.classList.contains('delete-icon')) {
                const productBusketPrice = event.target.previousElementSibling.previousElementSibling;
                const deleteProductName = event.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

                this.count--;

                [...sweetsName].forEach((item) => {

                    if (item.firstChild.textContent === deleteProductName) {
                        let homePageProductPrice = item.parentElement.lastElementChild.textContent;
                        homePageProductPrice = parseInt(homePageProductPrice.slice(0, -1));

                        productBusketPrice.textContent = parseInt(productBusketPrice.textContent) - homePageProductPrice;

                    }

                    if (productBusketPrice.textContent == 0) {
                        event.target.parentElement.remove();
                    }

                });

            }

            this.showTotals();

        });
    }

}
