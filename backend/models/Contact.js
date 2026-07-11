const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'رقم الهاتف مطلوب'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'الموضوع مطلوب'],
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة'],
    minlength: [10, 'الرسالة يجب أن تكون 10 أحرف على الأقل'],
  },
  read: {
    type: Boolean,
    default: false,
  },
  replied: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);