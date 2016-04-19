import express from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';
import { Article } from '../models';
import articleSchema from '../schemas/article';

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

function validationFailed(validationResult) {
  const errors = validationResult.error.details.map((errorDetails) => {
    const {
      message,
      type,
      path,
    } = errorDetails;

    return {
      message,
      type,
      path,
    };
  });

  return {
    errors,
  };
}

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

/* Create new article. */
router.post('/articles', (req, res, next) => {
  const data = req.body;
  const validationResult = Joi.validate(data, articleSchema);

  if (validationResult.error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(validationFailed(validationResult));
  }

  return Article
    .create(validationResult.value)
    .then(article => {
      res.status(httpStatus.CREATED).json({
        item: article,
      });
    })
    .catch(next);
});

export default router;
