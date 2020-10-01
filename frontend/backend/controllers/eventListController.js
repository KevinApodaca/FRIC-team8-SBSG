const mongoose = require('mongoose');
const event = mongoose.model('event');

exports.list_all_events = (req,res) =>{
  event.find({},(err,event) =>{
    if (err) res.send(err);
    res.json(event);
  });
};

exports.create_event = (req, res) =>{
  const newEvent = new event(req.body);
  newEvent.save((err,event) => {
    if (err) res.send(err);
    res.json(event);
  });
};

exports.read_event = (req, res) => {
  event.findById(req.params.eventId, (err,event) => {
    if (err) res.send(err);
    res.json(event);
  });
};

exports.update_event = (req, res) => {
  event.findOneAndUpadate(
    {_id: req.params.eventId},
    req.body,
    {new: true},
    (err,event) => {
      if (err) res.send(err);
      res.json(event);
    }
  );
};

exports.delete_event = (req, res) => {
  task.deleteOne({ _id: req.params.eventIdId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'event successfully deleted',
     _id: req.params.eventId
    });
  });
};
