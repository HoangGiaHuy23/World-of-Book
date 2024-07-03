const Province = require('../models/Provinces')
const District = require('../models/Districts')
const Ward = require('../models/Wards')

const getAllProvince = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (filter) {
                const allObjectFilter = await Province.find({ [filter[0]]: { '$regex': filter[1] } })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                })
            }
            const allProvince = await Province.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProvince,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllDistrict = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (filter) {
                const allObjectFilter = await District.find({ [filter[0]]: { '$regex': filter[1] } })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                })
            }
            const allDistrict = await District.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allDistrict,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllWard = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (filter) {
                const allObjectFilter = await Ward.find({ [filter[0]]: { '$regex': filter[1] } })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                })
            }
            const allWard = await Ward.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allWard,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllProvince,
    getAllDistrict,
    getAllWard,
}