export class OrderModel {

    constructor(
        public email: string,
        public name: string,
        public lastname: string,
        public phone: number,
        public client_reference: string,
        public zipcode: number,
        public state: string,
        public city: string,
        public suburb: string,
        public street: string,
        public num_ext: number,
        public num_int?: number
    ) {}
}
