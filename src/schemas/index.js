import { Schema, arrayOf } from 'normalizr';

const articleSchema = new Schema('articles', {
  idAttribute: 'id',
});

export default {
  ARTICLE: articleSchema,
  ARTICLES_LIST: arrayOf(articleSchema),
};
