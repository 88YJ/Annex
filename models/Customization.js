const mongoose = require('mongoose');

const CustomizationSchema = mongoose.Schema({
 outline: [
  {
   R: {
    type: String,
    required: true,
   },
   G: {
    type: String,
    required: true,
   },
   B: {
    type: String,
    required: true,
   },
  },
 ],

 header: [
  {
   R: {
    type: String,
    required: true,
   },
   G: {
    type: String,
    required: true,
   },
   B: {
    type: String,
    required: true,
   },
   BR: {
    type: String,
    required: true,
   },
   BG: {
    type: String,
    required: true,
   },
   BB: {
    type: String,
    required: true,
   },
  },
 ],

 font: [
  {
   R: {
    type: String,
    required: true,
   },
   G: {
    type: String,
    required: true,
   },
   B: {
    type: String,
    required: true,
   },
   BR: {
    type: String,
    required: true,
   },
   BG: {
    type: String,
    required: true,
   },
   BB: {
    type: String,
    required: true,
   },
  },
 ],
});

module.exports = mongoose.model('custom', CustomizationSchema);
