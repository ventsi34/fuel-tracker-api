const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  vehicle: {
    type: String,
    required: [true, 'Please add vehicle for this trip'],
  },
  mileage: {
    type: Number,
    required: [true, 'Please add mileage for this trip'],
  },
  petrolStation: {
    type: String,
    required: [true, 'Please add petrol station'],
    trim: true,
  },
  drivePlace: {
    type: String,
  },
  driveType: {
    type: String,
  },
  season: {
    type: String,
  },
  airConditionerStatus: {
    type: Boolean,
    default: false
  },
  isPremiumFuel: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', TripSchema);
