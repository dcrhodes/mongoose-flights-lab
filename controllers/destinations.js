import { Destination } from "../models/destination.js"
import { Flight } from "../models/flight.js"

export {
    newDestination as new,
    create,
}

function newDestination(req, res) {
    Destination.find({})
    .then(destinations =>{
        res.render("destinations/new", { 
            title: "New Destination", 
            destinations: destinations})
    })
    .catch(err => {
        console.log(err)
    })
}
function create(req, res) {
    Destination.create(req.body)
    .then(result => res.redirect("/destinations/new"))
    .catch(err => console.log(err))
}