var express = require('express');
var router = express.Router();
var userSchema = require("../models/userSchema")

const validation = (request, response, next) => {
  const { error } = userSchema.validate(request.body)
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');

    console.log("error", message);
    response.status(422).json({ error: message})
  }
}

router.get('/', function(req, res, next) {
  res.json([]);
});

router.post('/', validation, (request, response) => {
  response.status(201).json(request.body);
})

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
