const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: async (req, res) => {
    try {
      const flightId = req.params.id; 
      const flight = await Flight.findById(flightId);
      res.render('tickets/new', { flightId, flight });
    } catch (error) {
      console.error(error);
      res.redirect(`/flights/${req.params.id}`);
    }
  },

  create: async (req, res) => {
    try {
      const flightId = req.params.id;
      const ticketData = req.body;
      ticketData.flight = flightId;

      const ticket = new Ticket(ticketData);
      await ticket.save();
      res.redirect(`/flights/${flightId}`);
    } catch (error) {
      console.error(error);
      res.redirect(`/flights/${flightId}`);
    }
  },
};
