import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

  id: { type: String, required: true, unique: true },
  movieId: { type: Number },
  author:  { type: String },
  rating: { type: Number },
  content: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

ReviewSchema.statics.findByMovieId = function (id) {
  return this.find({ movieId: id });
};

export default mongoose.model('Reviews', ReviewSchema);



