import { Observable } from "./observable";

export class CheckboxService {
    constructor() {
        this._checkbox = document.querySelectorAll('.all-products input[type=checkbox]');
        this._observable = new Observable();
        this.filters = {};
        this.setInitialState();
        this.init();
    }

    init() {
        const self = this;
        this._checkbox.forEach((item) => {
           item.addEventListener('click', this.onCheckboxClick.bind(self));
        });

        document.querySelector('.filters button').addEventListener('click', (event) => {
            event.preventDefault();
            this.filters = {};
            this._observable.next('#');
        });
    }

    subscribe(fn) {
        this._observable.subscribe(fn);
    }


    onCheckboxClick(event) {
        const target = event.target;
        const specName = target.getAttribute('name');

        if (target.checked) {
            if(!(this.filters[specName] && this.filters[specName].length)) {
                this.filters[specName] = [];
            }
            this.filters[specName].push(target.value);
        } else {
            if (this.filters[specName] && this.filters[specName].length &&
                (this.filters[specName].indexOf(target.value) !== -1)) {
                let index = this.filters[specName].indexOf(target.value);
                this.filters[specName].splice(index, 1);

                if( !this.filters[specName].length) {
                    delete this.filters[specName];
                }
            }
        }
        this._observable.next(this.createQueryHash(this.filters));

    }

    setInitialState() {
        if (location.hash.includes('#filters/')) {
            let filter = location.hash.split('#filter/')[1].trim();
            try {
                this.filters = JSON.parse(decodeURI(filter));
            } catch(err) {
                this.filters = {};
            }
        }
    }


    clearCheckbox() {
        this._checkbox.forEach((item) => {
            item.checked = false;
        });
    }

    renderFilters(products, filter) {
        const criteria = ['manufacturer', 'storage', 'os', 'camera'];
        products = [...products];
        let result = [];
        let isFiltered = false;
        this.clearCheckbox();

        criteria.forEach((c) => {

            if (filter[c] && filter[c].length) {
                if (isFiltered) {
                    products = result;
                    result = [];
                }

                filter[c].forEach((filter) => {
                    products.forEach((product) => {
                        if (typeof product.specs[c] === 'number') {
                            if(product.specs[c] === Number(filter)) {
                                result.push(product);
                                isFiltered = true;
                            }
                        }

                        if (typeof product.specs[c] === 'string') {
                            if(product.specs[c].toLowerCase().indexOf(filter) !== -1) {
                                result.push(product);
                                isFiltered = true;
                            }
                        }


                    });
                    if (c && filter) {
                        [...document.querySelectorAll(`input[name=${c}]`)].filter((checkbox) => {
                           return checkbox.value === filter;
                        })[0].checked = true;
                    }
                })
            }
        });

        return result;
    }

    getCurrentState() {
        return this.createQueryHash(this.filters);
    }

    createQueryHash(filters) {
        if (Object.keys(filters).length > 0) {
            return `#filter/${JSON.stringify(filters)}`;
        }

        return '#';
    }

}