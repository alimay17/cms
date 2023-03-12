var express = require('express');
var router = express.Router();

const Message = require('../models/message');

// get messages
router.get('/messages', (req, res, next) => {

  Message.find().then(messages => {
    // return results
    if (!messages) {
      res.status(500).json({
        message: 'Unable to get messages',
        content: error
      });
    } else {
      res.status(200).json({
        message: 'Posts fetched successfully',
        content: messages
      });
    }
  })
});

module.exports = router;