const express = require('express')
const router = express.Router()
const {
  getProfile,
  updateProfile,
  completeActivity,
  uncompleteActivity,
} = require('../controllers/profileController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.route('/').get(getProfile).put(updateProfile)
router.post('/activity/:activityId', completeActivity)
router.delete('/activity/:activityId', uncompleteActivity)

module.exports = router
