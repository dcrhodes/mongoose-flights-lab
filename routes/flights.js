import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'


export {
  router
}

router.get('/new', flightsCtrl.new)
router.get('/', flightsCtrl.index)
router.get('/:id', flightsCtrl.show)
router.get('/:id/edit', flightsCtrl.edit)

router.post("/:id/destinations", flightsCtrl.addDestination)
router.post('/:id', flightsCtrl.addTicket)
router.post('/', flightsCtrl.create)
