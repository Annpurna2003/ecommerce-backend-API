
// Runs the JOI schema you wrote in auth.validation.js or cart.validation.js.
// It is a reusable Joi validation middleware.
export default (schema)=>(req,res,next)=>{
  const {error,value}=schema.validate(req.body,{abortEarly:false,stripUnknown:true});

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((d) => d.message),
    });
  }

  req.body = value; // sanitized data
  next();
};
 //abortEarly:false ensures all errors are reported
  //stripUnknown:true removes unknown keys from the validated data