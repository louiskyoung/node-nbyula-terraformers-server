const router = require('express').Router()

const authController = require('./controllers/auth')
const jobsController = require('./controllers/jobs')
const { authMiddleware } = require('./middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router
  .use(authMiddleware)
  .get('/getUserInfo', authController.getUserInfo)
  .post('/jobs', jobsController.postJob)
  .delete('/jobs/:id', jobsController.archiveJob)
  .get('/jobs', jobsController.getJobs)
  .patch('/jobs/:id/mark', jobsController.markJob)
  .patch('/jobs/:id/updateOrder', jobsController.updateOrder)

module.exports = router
