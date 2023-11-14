const Flight = require('../models/flight');
const Ticket = require('../models/ticket'); 

module.exports = {
  index: async (req, res) => {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
  },

  new: (req, res) => {
    res.render('flights/new');
  },

  create: async (req, res) => {
    const flight = new Flight(req.body);
    await flight.save();
    res.redirect('/flights');
  },

  show: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      const tickets = await Ticket.find({ flight: flight._id }); // Find tickets related to the flight
      res.render('flights/show', { flight, tickets });
    } catch (error) {
      console.error(error);
      res.redirect('/flights');
    }
  },
  
  delete: async (req, res) => {
    try {
      const flightId = req.params.id;
      await Flight.findByIdAndDelete(flightId);
      res.redirect('/flights');
    } catch (error) {
      console.error(error);
      res.redirect('/flights'); 
    }
  },
};
