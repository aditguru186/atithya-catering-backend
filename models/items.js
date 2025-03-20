class Item {
    item_id;
    item_name;
    item_price;
    item_quantity;


    constructor(itemData) {
        this.validateItemData(itemData);

        this.item_id = itemData.item_id;
        this.item_name = itemData.item_name;
        this.item_price = Number(itemData.item_price) || 0;
        this.item_quantity = Number(itemData.item_quantity) || 0;
    }

    validateItemData(data) {
        if (!data.item_id || typeof data.item_id !== 'string') {
            throw new Error('Invalid item_id: Must be a non-empty string');
        }
        if (!data.item_name || typeof data.item_name !== 'string') {
            throw new Error('Invalid item_name: Must be a non-empty string');
        }
        if (data.item_price && (isNaN(Number(data.item_price)) || Number(data.item_price) < 0)) {
            throw new Error('Invalid item_price: Must be a non-negative number');
        }
        if (data.item_quantity && (isNaN(Number(data.item_quantity)) || Number(data.item_quantity) < 0)) {
            throw new Error('Invalid item_quantity: Must be a non-negative number');
        }
    }

    serialize() {
        return JSON.stringify({
            item_id: this.item_id,
            item_name: this.item_name,
            item_price: this.item_price,
            item_quantity: this.item_quantity
        });
    }

    static deserialize(itemData) {
        const parsed = JSON.parse(itemData);
        return new Item(parsed);
    }

    updateQuantity(quantity) {
        const newQuantity = Number(quantity);
        if (isNaN(newQuantity) || newQuantity < 0) {
            throw new Error('Invalid quantity: Must be a non-negative number');
        }
        this.item_quantity = newQuantity;
    }

    updatePrice(price) {
        const newPrice = Number(price);
        if (isNaN(newPrice) || newPrice < 0) {
            throw new Error('Invalid price: Must be a non-negative number');
        }
        this.item_price = newPrice;
    }
}

module.exports = Item;