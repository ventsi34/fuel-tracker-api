const constants = {
  ENVS: {
    PROD: 'production',
    DEV: 'development'
  },
  PAGINATION: {
    DEFAULT_LIMIT: 20
  },
  MODELS_ENUMS: {
    TRIP: {
      PETROL_STATIONS: [
        'Petrol',
        'Shell',
        'Gazprom',
        'OMV',
        'Lukoil',
        'VM petroleum',
        'Rompetrol',
        'Marieta',
        'EKO',
        'InterSpeed',
        'Go petroleum',
        'Other'
      ],
      SEASONS: [
        'winter',
        'summer'
      ],
      DRIVE_TYPE: [
        'slow',
        'normal',
        'fast'
      ],
      DRIVE_PLACE: [
        'city',
        'highway',
        'mountain'
      ]
    },
  } 
};

module.exports = constants;
