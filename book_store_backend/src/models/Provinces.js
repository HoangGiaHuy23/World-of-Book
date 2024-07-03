const mongoose = require('mongoose')

const provincesSchema = new mongoose. Schema(
    {
        province_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        type: { type: Number, required: true },
        typeText: { type: String, required: true },
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Provinces = mongoose.model('provinces', provincesSchema);

module.exports = Provinces;