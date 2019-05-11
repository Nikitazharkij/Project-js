import { Router } from './router'

class App {
    constructor() {
        this.products = [];
        this.router = new Router();
        this.init();

    }

    init() {
        fetch('http://localhost:3006/products', { headers: {
            'Content-Type': 'application/json'
        }})
            .then((res) => res.json())
            .then((data) => {
                this.products = data;
                this.initRoutes();
            });
    }

    initRoutes() {
        this.addRoute('', this.renderHomePage.bind(this));
    }

    renderHomePage() {
        this.renderProductsPage(this.products);
    }

    renderProductsPage(data) {
        const page = document.querySelector('.all-products');
        const allProducts = document.querySelector('.all-products .products-list > li');
    }
}

const app = new App();