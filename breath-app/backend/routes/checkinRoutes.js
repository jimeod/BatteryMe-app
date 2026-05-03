const express = require('express')
const router = express.Router()
const { createCheckin, getCheckins } = require('../controllers/checkinController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.route('/').get(getCheckins).post(createCheckin)

module.exports = router
