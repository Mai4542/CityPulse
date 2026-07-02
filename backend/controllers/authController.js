const User = require('../models/User');
const AppError = require('../utils/AppError');
const { validationResult } = require('express-validator');


const register = async (req, res, next) => {
  try {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phoneNumber }] 
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return next(new AppError('Email already registered', 400));
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return next(new AppError('Phone number already registered', 400));
      }
    }

   
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    
    const token = user.generateAuthToken();

  
    res.status(201).json({
      success: true,
      token,
      data: {
        user,
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated. Please contact support.', 401));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 401));
    }

  
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

   
    const token = user.generateAuthToken();

  
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};


const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};


const updateMe = async (req, res, next) => {
  try {
   
    if (req.body.password) {
      return next(new AppError('This route is not for password updates. Please use /update-password', 400));
    }

    
    const allowedFields = ['firstName', 'lastName', 'phoneNumber'];
    const filteredBody = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredBody[key] = req.body[key];
      }
    });


    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};


const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    
    const user = await User.findById(req.user.id).select('+password');

    
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return next(new AppError('كلمة المرور غير صحيحة', 401));
    }

   
    user.password = newPassword;
    await user.save();

  
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      token,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};


const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  updatePassword,
  logout,
};