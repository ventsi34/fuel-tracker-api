const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  mark: {
    type: String,
    required: [true, 'Please add vehicle mark'],
    trim: true,
    maxlength: [60, 'Mark can not be more than 60 characters']
  },
  model: {
    type: String,
    required: [true, 'Please add vehicle model'],
    trim: true,
    maxlength: [60, 'Model can not be more than 60 characters']
  },
  mileage: {
    type: Number,
    required: [true, 'Please add vehicle mileage'],
    trim: true,
    min: [1, 'The vehicle can not be with lower mileage than 1']
  },
  dateOfManufacture: {
    type: Number,
    required: [true, 'Please add vehicle year of manufacture'],
    trim: true,
    min: [1900, 'The vehicle can not be older than 1900'],
    max: [2300, 'The vehicle can not be newer than 2300']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

VehicleSchema.pre('remove', async function(next) {
  await this.model('Trip').deleteMany({ vehicle: this._id });
  next();
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
