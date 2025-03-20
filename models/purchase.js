class Purchase {
    purchase_id;
    item_name;
    item_id;
    quantity;
    vendor;
    total;
    paid;
    remnant;

    constructor(purchaseData) {
        this.validatePurchaseData(purchaseData);

        this.purchase_id = purchaseData.purchase_id;
        this.item_name = purchaseData.item_name;
        this.item_id = purchaseData.item_id;
        this.quantity = Number(purchaseData.quantity);
        this.vendor = purchaseData.vendor;
        this.total = Number(purchaseData.total) || 0;
        this.paid = Number(purchaseData.paid) || 0;
        this.remnant = this.calculateRemnant();
    }

    validatePurchaseData(data) {
        if (!data.purchase_id || typeof data.purchase_id !== 'string') {
            throw new Error('Invalid purchase_id: Must be a non-empty string');
        }
        if (!data.item_name || typeof data.item_name !== 'string') {
            throw new Error('Invalid item_name: Must be a non-empty string');
        }
        if (!data.item_id || typeof data.item_id !== 'string') {
            throw new Error('Invalid item_id: Must be a non-empty string');
        }
        if (!data.quantity || isNaN(Number(data.quantity)) || Number(data.quantity) <= 0) {
            throw new Error('Invalid quantity: Must be a positive number');
        }
        if (!data.vendor || typeof data.vendor !== 'string') {
            throw new Error('Invalid vendor: Must be a non-empty string');
        }
        if (data.total && (isNaN(Number(data.total)) || Number(data.total) < 0)) {
            throw new Error('Invalid total: Must be a non-negative number');
        }
        if (data.paid && (isNaN(Number(data.paid)) || Number(data.paid) < 0)) {
            throw new Error('Invalid paid amount: Must be a non-negative number');
        }
    }

    calculateRemnant() {
        return this.total - this.paid;
    }

    serialize() {
        return JSON.stringify({
            purchase_id: this.purchase_id,
            item_name: this.item_name,
            item_id: this.item_id,
            quantity: this.quantity,
            vendor: this.vendor,
            total: this.total,
            paid: this.paid,
            remnant: this.remnant
        });
    }

    static deserialize(purchaseData) {
        const parsed = JSON.parse(purchaseData);
        return new Purchase(parsed);
    }
}

module.exports = Purchase;