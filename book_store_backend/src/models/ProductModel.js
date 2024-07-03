const mongoose = require('mongoose')

const productSchema = new mongoose. Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        provider: { type: String, required: true },
        author: { type: String, required: true },
        publisher: { type: String, required: true },
        publisherYear: { type: Number, required: true },
        weight: { type: Number, required: true },
        packagingSize: { type: String, required: true },
        pages: { type: Number, required: true },
        form: { type: String, required: true },            
        description: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;