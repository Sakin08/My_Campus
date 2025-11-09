/**
 * Simple validation helpers
 */

function isNonEmptyString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function validateBuySellInput(payload) {
  const errors = [];
  if (!isNonEmptyString(payload.title)) errors.push('title is required');
  if (!isNonEmptyString(payload.description)) errors.push('description is required');
  if (typeof payload.price !== 'number' || Number.isNaN(payload.price)) errors.push('price must be a number');
  if (payload.images && !Array.isArray(payload.images)) errors.push('images must be array of URLs');
  return errors;
}

function validateBorrowInput(payload) {
  const errors = [];
  if (!isNonEmptyString(payload.itemName)) errors.push('itemName is required');
  if (!payload.requestDate || isNaN(Date.parse(payload.requestDate))) errors.push('requestDate is required and must be a valid date');
  return errors;
}

function validateHousingInput(payload) {
  const errors = [];
  if (!isNonEmptyString(payload.type)) errors.push('type is required');
  if (!isNonEmptyString(payload.location)) errors.push('location is required');
  if (payload.rent !== undefined && (typeof payload.rent !== 'number' || Number.isNaN(payload.rent))) errors.push('rent must be a number');
  return errors;
}

module.exports = {
  validateBuySellInput,
  validateBorrowInput,
  validateHousingInput
};
