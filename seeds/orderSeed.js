const { Order } = require('../models');

const orderData = [
    {
        carrier: 'FedEx',
        shipmentNo: 3172,
        status: 'In Transit',
    },
    {
        carrier: 'FedEx',
        shipmentNo: 3821,
        status: 'Delivered',
    },
    {
        carrier: 'UPS',
        shipmentNo: 8682,
        status: 'In Transit',
    },
    {
        carrier: 'UPS',
        shipmentNo: 8043,
        status: 'Delivered',
    }
]

const orderInfo = () => Order.bulkCreate(orderData);
module.exports = orderInfo;