import axios from "axios"

export const getAllProvince = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/region/get-all-province`)
    return res.data
}


export const getAllDistrict = async (province_id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/region/get-all-district?filter=provinceId&filter=${province_id}`)
    return res.data
}


export const getAllWard = async (district_id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/region/get-all-ward?filter=districtId&filter=${district_id}`)
    return res.data
}