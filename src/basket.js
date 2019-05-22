export class Basket {
    constructor() {
        this.items = {};
        this.count = 0;
        this.itemTotal = document.getElementById('item-total');
        this.itemCount = document.getElementById('item-count');
        this.spendMoney = document.getElementById('final-money');
        this.buyItems();
        this.deleteItem();
    }

    addPriceList(){
        const productButtons = document.querySelectorAll('.product-button');

        productButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            let price = event.target.nextElementSibling.textContent;
            let finalPrice = price.slice(0, -1);
            this.items.price = finalPrice;
            this.count++;

            let nameItem = event.target.previousElementSibling.previousElementSibling.textContent;
            this.items.name = nameItem;

            let fullPath = event.target.parentElement.firstElementChild.firstElementChild.src;
            let path = fullPath.indexOf('images');
            let partPath = fullPath.slice(path);
            this.items.img = fullPath;

            const cartItem = document.createElement('div');
            cartItem.classList.add('items-list');
            cartItem.innerHTML = `
                    <img src="${this.items.img}"/>
                    <h3>${this.items.name}</h3>
                    <span class="price-item">${this.items.price}</span>
                    <span>$</span>
                    <div class="delete-icon fas fa-trash" data-id="${this.count}"></div>
            `

            const cart = document.getElementById('cart-item');
            const total = document.getElementById('close-cart');
            cart.insertBefore(cartItem, total);

            this.showTotals();
        })
    });

    }

    renderTotalProducts() {
        const pageTotal = document.querySelector('.total-products');
        pageTotal.classList.add('visible');
    }

    showTotals(){
        const total = [];
        const items = document.querySelectorAll('.price-item');

        items.forEach((item) => {
            total.push(parseFloat(item.textContent));
        });

        let totalMoney = total.reduce((sum, current) => {
            return sum + current;
        }, 0);

        let finalMoney = totalMoney.toFixed(2);

        this.itemTotal.textContent = finalMoney;
        this.spendMoney.textContent= finalMoney;
        this.itemCount.textContent = total.length;
    }

    buyItems(){
    const totalButton = document.querySelector('.total-button');

    totalButton.addEventListener('click', (event) => {
        const itemsList = document.querySelectorAll('.total-products .items-list');

        this.itemTotal.textContent = 0;
        this.spendMoney.textContent= 0;
        this.itemCount.textContent = 0;

        if (itemsList.length === 0) {
            alert('No items for ordering!!!')
        } else {
            alert('You bought products.')
        }

        itemsList.forEach((item) => {
            item.remove();
        });

    });

}

    deleteItem(){
    const totalProducts = document.querySelector('.total-products');

        totalProducts.addEventListener('click', (event) => {

            if (event.target.classList.contains('delete-icon')) {
                event.target.parentElement.remove();
            }

            this.showTotals();

        });
    }

}
