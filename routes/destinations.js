import { Router } from "express"
import * as destinationsCtrl from "../controllers/destinations.js"
const router = Router()

export {
    router
}

router.get("/new", destinationsCtrl.new)
router.post("/", destinationsCtrl.create)