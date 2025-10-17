import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  basicInfo: {
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    height: {
      feet: Number,
      inches: Number
    },
    maritalStatus: {
      type: String,
      enum: ['unmarried', 'divorced', 'widowed']
    },
    religion: String,
    caste: String,
    subCaste: String,
    motherTongue: String
  },
  professionalInfo: {
    education: String,
    college: String,
    occupation: String,
    annualIncome: String,
    workingWith: String
  },
  familyInfo: {
    fatherOccupation: String,
    motherOccupation: String,
    siblings: Number,
    familyStatus: String,
    familyType: String,
    familyValues: String
  },
  lifestyle: {
    diet: String,
    smoke: String,
    drink: String
  },
  partnerPreferences: {
    ageRange: {
      min: Number,
      max: Number
    },
    heightRange: {
      min: Number,
      max: Number
    },
    maritalStatus: [String],
    religion: String,
    caste: String,
    education: String,
    occupation: String
  },
  photos: [{
    url: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  about: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  contact: {
    phone: String,
    whatsapp: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);