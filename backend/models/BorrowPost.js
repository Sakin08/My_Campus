const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  requestDate: { type: Date, required: true },
  returnDate: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // lender
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

borrowSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BorrowPost', borrowSchema);
