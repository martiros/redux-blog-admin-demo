import express from 'express';
import { Article } from '../models';

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

/* Get articles. */
router.get('/articles', (req, res, next) => {
  Article
    .findAll()
    .then(articles => {
      res.json({
        items: articles,
      });
    })
    .catch(next);
});

export default router;
