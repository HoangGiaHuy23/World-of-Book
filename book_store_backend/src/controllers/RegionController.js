const RegionService = require('../services/RegionService')

const getAllProvince = async (req, res) => {
    try {
        const response = await RegionService.getAllProvince()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: е
        })
    }
}

const getAllDistrict = async (req, res) => {
    try {
        const {filter } = req.query
        const response = await RegionService.getAllDistrict(filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: е
        })
    }
}

const getAllWard = async (req, res) => {
    try {
        const {filter } = req.query
        const response = await RegionService.getAllWard(filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: е
        })
    }
}

module.exports = {
    getAllProvince,
    getAllDistrict,
    getAllWard,
}