const mongoose = require('mongoose');
const { MODELS_ENUMS } = require('../utils/constants');

const TripSchema = new mongoose.Schema({
  mileage: {
    type: Number,
    required: [true, 'Please add mileage for this trip'],
  },
  fuelAmount: {
    type: Number,
    required: [true, 'Please add fuel amount of current charging'],
  },
  averageFuelConsumption: {
    type: Number
  },
  petrolStation: {
    type: String,
    required: [true, 'Please add drive type'],
    enum: MODELS_ENUMS.TRIP.PETROL_STATIONS
  },
  drivePlace: {
    type: [String],
    required: [true, 'Please add drive type'],
    enum: MODELS_ENUMS.TRIP.DRIVE_PLACE
  },
  driveType: {
    type: String,
    required: [true, 'Please add drive type'],
    enum: MODELS_ENUMS.TRIP.DRIVE_TYPE
  },
  season: {
    type: String,
    required: [true, 'Please add season'],
    enum: MODELS_ENUMS.TRIP.SEASONS
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
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    require: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
});

TripSchema.pre('save', function(next) {
  this.averageFuelConsumption = ((this.fuelAmount / this.mileage) * 100).toFixed(2);
  next();
});

module.exports = mongoose.model('Trip', TripSchema);
