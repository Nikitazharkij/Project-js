export class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    next(data) {
        this.subscribers.forEach((subscriber) => {
           subscriber(data);
        });
    }

}