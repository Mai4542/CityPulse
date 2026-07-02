const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },

    reportNumber: {
        type: String,
        unique: true,
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },

    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['طرق وأرصفة', 'مياه وصرف', 'كهرباء وإنارة', 'نظافة وتجميل', 'بنية تحتية', 'مخاطر أخرى'],
    },

    images: {
        type: [String],
        default: [],

    },

    isRecurring: {
        type: String,
        enum: ['نعم، متكررة', 'لأول مرة', 'غير متأكد'],
        default: 'غير متأكد',
    },


    location: {
        lat: {
            type: Number,
            required: [true, 'Latitude is required'],
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required'],
        },
        address: {
            type: String,
            trim: true,
        },
        district: {
            type: String,
            trim: true,

        },
    },


    severity: {
        type: String,
        required: [true, 'Severity is required'],
        enum: ['منخفضة', 'متوسطة', 'عالية / طارئ'],
    },


    status: {
        type: String,
        enum: ['Open', 'Assigned', 'In Progress', 'Fixed', 'Closed'],
        default: 'Open',
    },

    assignedTo: {
        type: String,
        default: null,
    },

    statusHistory: {
        type: [
            {
                status: String,
                changedAt: { type: Date, default: Date.now },
                changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                note: String,
            },
        ],
        default: [],
    },


    nearHospital: {
        type: Boolean,
        default: false,
    },

    nearSchool: {
        type: Boolean,
        default: false,
    },

    reportsCount: {
        type: Number,
        default: 1,

    },

    priorityScore: {
        type: Number,
        default: 0,
    },
    rating: {
        score: { type: Number, min: 1, max: 5, default: null },
        comment: { type: String, default: null },
        ratedAt: { type: Date, default: null }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },

});


reportSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
reportSchema.pre('save', async function(next) {
  if (!this.reportNumber) {
    const lastReport = await mongoose.model('Report')
      .findOne({})
      .sort({ createdAt: -1 });
    
    const lastNumber = lastReport?.reportNumber 
      ? parseInt(lastReport.reportNumber.replace('C-', '')) 
      : 0;
    
    this.reportNumber = `C-${lastNumber + 1}`;
  }
  next();
  });

module.exports = mongoose.model('Report', reportSchema);