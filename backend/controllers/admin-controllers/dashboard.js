const {User} = require('../../models/userModel');
const {Table} = require('../../models/tableModel');
const {Menu} = require('../../models/menuModel');
const {KDS} = require('../../models/kdsModel');
const {KOT} = require('../../models/kotModel');
const {Waiter} = require('../../models/waiterModel');
const {Chef} = require('../../models/chefModel');

const getDashboardData = async (req, res) => {
    try {
        const privilege = req.privilege;
        if (privilege === 'admin') {
            const customers = await User.find({});
            const waiters = await Waiter.find({ privilege: 'waiter' });
            const chefs = await Chef.find({ privilege: 'chef' });
            const orders = await KOT.find({ billStatus: 'pending' });
            const tables = await Table.find({});
            const menuItems = await Menu.find({});
            const reservations = await Table.find({ status: 'occupied' });
            const ordersInKitchen = await KDS.find({});
            const waitlistCount = await Table.aggregate([
                {
                    $project: {waitlistSize: {$size: "$waitlist"}}
                },
                {
                    $group: {_id: null, totalWaitlistItems: {$sum: "$waitlistSize"}}
                }
            ]);
            const totalWaitlistItems = waitlistCount[0] ? waitlistCount[0].totalWaitlistItems : 0;
            const freeWaiters = await Waiter.find({privilege : 'waiter', servingTable : {$size : 0}});
            res.json({
                status: 200,
                totalCustomers: customers.length,
                totalWaiters: waiters.length,
                totalChefs: chefs.length,
                totalOrder: orders.length,
                totalTables: tables.length,
                totalMenuItems: menuItems.length,
                totalReservations: reservations.length,
                totalOrdersInKitchen: ordersInKitchen.length,
                totalWaitingCustomers: totalWaitlistItems,
                totalFreeWaiters : freeWaiters.length
            });
        } else {
            res.json({ status: 401, message: 'Error fetching data' });
        }
    } catch (error) {
        res.json({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {getDashboardData};