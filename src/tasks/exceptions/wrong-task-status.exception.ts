export class WrongTaskStatusExcepetion extends Error {
    constructor () {
        super('Wrong task status transition!');
        this.name = 'WrongTaskStatusException';
    }
}