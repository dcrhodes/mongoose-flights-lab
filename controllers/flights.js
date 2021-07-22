import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

export {
    newFlight as new,
    create,
    index,
    show,
    edit,
    addTicket,
    addDestination,
    deleteFlight as delete,
  }

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
    })
  }

function create(req, res) {
  const flight = new Flight(req.body)
  flight.save(function(error) {
    if (error) return res.redirect('/flights/new')
  res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      err: err,
      flights: flights,
      title: 'All Flights'
    })
  })
}

// function show(req, res) {
//   Flight.findById(req.params.id, function (err, flight) {
//       res.render('flights/show', {
//         title: 'Flight Details', 
//         flight: flight,
//       })
//     })
//   }

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destination}}, function(err, destinations) {
      res.render('flights/show', {
        title: 'Flight Details', 
        flight, flight,
        destinations: destinations,
      })
    })
  })
}



  function edit(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
      res.render('flights/edit', {
        flight,
        err, 
        title: 'Add Ticket'
      })
    })
  }

  function addTicket(req, res){
    Flight.findById(req.params.id, function(err, flight){
      flight.tickets.push(req.body)
      flight.save(function(err) {
        res.redirect(`/flights/${flight._id}`)
      })
    })
  }

  function addDestination(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.destinations.push(req.body.destinationId)
        flight.save()
        .then(result => res.redirect(`/flights/${flight._id}`))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}