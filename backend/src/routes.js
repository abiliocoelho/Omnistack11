const {Router} = require('express')

const OngsController = require('./controllers/OngsController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = Router()

routes.get('/ongs',OngsController.index)
routes.post('/ongs',OngsController.create)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/sessions', SessionController.create)

module.exports = routes