const express = require('express');

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

/* GET users listing. */
router.get('/articles', (req, res) => {
  res.json({
    item: {
      data: 'Some user',
    },
  });
});

module.exports = router;
