const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');

exports.submitContact = async (req, res, next) => {
  try {
    const { fullName, phone, subject, message } = req.body;

    const contact = await Contact.create({
      fullName,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح، وسيتم التواصل معك قريباً',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      return next(new AppError('الرسالة غير موجودة', 404));
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleReplied = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new AppError('الرسالة غير موجودة', 404));
    }

    contact.replied = !contact.replied;
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};