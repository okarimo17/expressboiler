const Joi = require('joi');



let InformationSchema = Joi.object( {
    content:Joi.object().required()
});


module.exports = {
    InformationSchema
}
