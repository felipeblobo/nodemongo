const express = require('express');
const router = express.Router();
const userSchema = require("../models/userSchema")

const validation = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');

    console.log("error", message);
    res.status(422).json({ error: message})
  }
}

router.get('/novo', function(req, res, next) {
  res.json([]);
});

router.post('/novo', validation, (req, res) => {
  res.status(201).json(req.body);
})

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
