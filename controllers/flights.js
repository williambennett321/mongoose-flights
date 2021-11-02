import { Destination } from "../models/destination.js"
import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights/index", {
      flights,
      title: "All Flights"
    })
  })
}

function newFlight (req,res) {
res.render("flights/new", {
  title: "Add Flight"
  })
}
function create (req,res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err, flight){
    if (err) {
      return res.redirect("/flights/new")
    }
    res.redirect("/flights/")
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, 
      function(err, destinations) {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight,
        destinations,
      })
    })
  })
}

function addTicket (req,res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    
    })
  })
}

function postDest (req,res) {
    Flight.findById(req.params.id, function(err, flight) {
      flight.destinations.push(req.body.destinationId)
      .save(function(err) {
        res.redirect(`/flights/${flight._id}`)
      })
    })
  }


export {
  index,
  newFlight as new,
  create,
  show,
  addTicket,
  postDest
}