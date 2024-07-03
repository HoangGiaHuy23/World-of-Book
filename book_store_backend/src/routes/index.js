const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const RegionRouter = require('./RegionRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/region', RegionRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes