const express = require('express');
const router = express.Router();


router.get('/novo', function(req, res, next) {
  res.json([]);
});

router.post('/novo', (req, res) => {
  res.status(201).json(req.body);
})

module.exports = router;
