class Customer{
    customer_id;    
    customer_name;
    customer_contact;
    customer_email;
    customer_address;
    event_date;
    payment_status;
    payment_total;
    payment_remnant;

    constructor(customerData) {
        this.validateCustomerData(customerData);
        this.customer_id = customerData.customer_id;
        this.customer_name = customerData.customer_name;
        this.customer_contact = customerData.customer_contact;
        this.customer_email = customerData.customer_email;
        this.customer_address = customerData.customer_address;
        this.event_date = new Date(customerData.event_date);
        this.payment_status = customerData.payment_status || 'pending';
        this.payment_total = Number(customerData.payment_total) || 0;
        this.payment_remnant = Number(customerData.payment_remnant) || 0;
    }
    validateCustomerData(data) {
        if (!data.customer_id || typeof data.customer_id !== 'string') {
            throw new Error('Invalid customer_id: Must be a non-empty string');
        }
        if (!data.customer_name || typeof data.customer_name !== 'string') {
            throw new Error('Invalid customer_name: Must be a non-empty string');
        }
        if (!data.customer_contact || typeof data.customer_contact !== 'string') {
            throw new Error('Invalid customer_contact: Must be a non-empty string');
        }
        if (!data.customer_email || !this.isValidEmail(data.customer_email)) {
            throw new Error('Invalid customer_email format');
        }
        if (!data.event_date || isNaN(new Date(data.event_date))) {
            throw new Error('Invalid event_date: Must be a valid date');
        }
        if (data.payment_total && isNaN(Number(data.payment_total))) {
            throw new Error('Invalid payment_total: Must be a number');
        }
        if (data.payment_remnant && isNaN(Number(data.payment_remnant))) {
            throw new Error('Invalid payment_remnant: Must be a number');
        }
    }
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    get customer_id() { return this. customer_id; }
    get customer_name() { return this. customer_name; }
    get customer_contact() { return this. customer_contact; }
    get customer_email() { return this. customer_email; }
    get customer_address() { return this. customer_address; }
    get event_date() { return this. event_date; }
    get payment_status() { return this. payment_status; }
    get payment_total() { return this. payment_total; }
    get payment_remnant() { return this. payment_remnant; }
    
    serialize() {
        return JSON.stringify({
            customer_id: this. customer_id,
            customer_name: this. customer_name,
            customer_contact: this. customer_contact,
            customer_email: this. customer_email,
            customer_address: this. customer_address,
            event_date: this. event_date.toISOString(),
            payment_status: this. payment_status,
            payment_total: this. payment_total,
            payment_remnant: this. payment_remnant
        });
    }

    static deserialize(customerData) {
        const parsed = JSON.parse(customerData);
        return new Customer(parsed);
    }

    calculateRemnant() {
        return this. payment_total - (this. payment_total - this. payment_remnant);
    }
}