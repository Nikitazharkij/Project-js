export class Router {
    constructor() {
        this.routes = {
            '404': () => {
                console.log('Not found');
            }
        };

    }

    addRoute(route, action) {
        this.routes[route] = action;
    }

    render() {

    }
}