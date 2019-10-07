const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String },
  mobile: { type: Number, require: true },
  home: { type: Number },
  email: { type: String, require: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
