import Joi from 'joi';

export default (chai) => {
  const { Assertion } = chai;

  Assertion.addMethod('collectionOfItems', function responseContainscollectionOfItems(itemSchema) {
    const items = this._obj;

    new Assertion(items).to.be.an('array');

    let validationResult = null;
    let item = null;
    let message = null;
    let errorSource = '';
    for (let i = 0; i < items.length; i += 1) {
      item = items[i];
      validationResult = Joi.validate(item, itemSchema);
      if (validationResult.error) {
        const { error } = validationResult;
        errorSource = `item[${i}].${error.details[0].path}`;
        message = error.details[0].message;
        break;
      }
    }

    this.assert(
      message === null,
      `${errorSource} doesn't pass validation.` +
      `\nError Message - (${message})\nItem = \n${JSON.stringify(item, null, '\t')}`,
      'expected #{this} to not be collection of items'
    );
  });

  Assertion.addMethod('item', function responseContainsAnItem(itemSchema) {
    const item = this._obj;

    new Assertion(item).to.be.an('object');

    const validationResult = Joi.validate(item, itemSchema);
    let message = null;
    let errorSource = '';
    if (validationResult.error) {
      const { error } = validationResult;
      message = error.message;
      errorSource = error.details[0].path;
    }

    this.assert(
      message === null,
      `${errorSource} doesn't pass validation.` +
      `\nError Message - (${message})\nItem = \n${JSON.stringify(item, null, '\t')}`,
      'expected #{this} to not be an item'
    );
  });
};
