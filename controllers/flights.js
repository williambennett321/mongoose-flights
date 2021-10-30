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
  const flight = new Flight(req.body)
  flight.save(function(err, flight){
    if (err) {
      return res.redirect("/flights/new")
    }
    res.redirect("/flights/")
  })
}

export {
  index,
  newFlight as new,
  create
}