import Joi from 'joi';
//To validate user input before it reaches your controller.
export const registerSchema=Joi.object({
    name:Joi.string().min(3).max(30).required().messages({
        'string.empty':'Name is required',
        'string.min':'Name must be atleast 3 characters long',
        'string.max':'Name must be atmost 30 characters long'
    }),
    house_no: Joi.string().required().messages({
        'string.empty':'House number is required'
    }),
    street_no:Joi.string().required().messages({
        'string.empty':'Street number is required'
    }),post_office: Joi.string().required().messages({
    'string.empty': 'Post office is required'
  }),

  district: Joi.string().required().messages({
    'string.empty': 'District is required'
  }),

  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      'string.empty': 'Pincode is required',
      'string.pattern.base': 'Pincode must be exactly 6 digits'
    }),

  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Mobile number must be exactly 10 digits'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid format (example@mail.com)'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters'
    }),
});

// LOGIN VALIDATION
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid format'
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long'
    }),
})