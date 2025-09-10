const express = require('express')
const { addTask, removeTask, updateTask, getTask } = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/get', auth, getTask);
router.post('/add', auth, addTask);
router.delete('/remove', auth, removeTask);
router.put('/update', auth, updateTask);

module.exports = router;