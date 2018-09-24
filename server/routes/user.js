const router = require('express').Router()
const usersController = require('../controllers/users');

router.post('/', usersController.create)
      .get ('/', usersController.list)
      .put ('/:id', usersController.update)

router.post('/login', usersController.login)

router.get('/validation', usersController.validation)

module.exports = router
