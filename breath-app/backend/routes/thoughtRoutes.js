const express = require('express')
const router = express.Router()
const {
  createThought,
  getThoughts,
  deleteThought,
  completeThoughtActivity,
} = require('../controllers/thoughtController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.route('/').get(getThoughts).post(createThought)
router.post('/complete', completeThoughtActivity)
router.delete('/:id', deleteThought)

module.exports = router
