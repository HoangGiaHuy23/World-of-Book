const mongoose = require('mongoose')

const districtsSchema = new mongoose. Schema(
    {
        district_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        province_id: { type: String, required: true },
        type: { type: Number, required: true },
        typeText: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Districts = mongoose.model('districts', districtsSchema);

module.exports = Districts;