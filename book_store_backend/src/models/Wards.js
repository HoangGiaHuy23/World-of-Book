const mongoose = require('mongoose')

const wardsSchema = new mongoose. Schema(
    {
        ward_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        district_id: { type: String, required: true },
        type: { type: Number, required: true },
        typeText: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Wards = mongoose.model('wards', wardsSchema);

module.exports = Wards;