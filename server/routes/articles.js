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
    .then((articles) => {
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
    .then((article) => {
      res.status(httpStatus.CREATED).json({
        item: article,
      });
    })
    .catch(next);
});

/* Update article. */
router.put('/articles/:id', (req, res, next) => {
  const articleId = req.params.id;
  const validationResult = Joi.validate(req.body, articleSchema);

  if (validationResult.error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(validationFailed(validationResult));
  }

  return Article
    .findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'NOT_FOUND',
        });
      }

      return article
        .update(validationResult.value)
        .then(() => {
          res.json({
            item: article,
          });
        });
    })
    .catch(next);
});

/* Update article. */
router.delete('/articles/:id', (req, res, next) => {
  const articleId = req.params.id;

  return Article
    .findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'NOT_FOUND',
        });
      }

      return article
        .destroy()
        .then(() => {
          res.status(httpStatus.NO_CONTENT).json(null);
        });
    })
    .catch(next);
});

export default router;
