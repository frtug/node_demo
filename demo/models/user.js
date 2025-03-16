const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    
    password:{
        type:String,
        required: true
    },
    movies:[
        {
            movieId:{
                type:Schema.Types.ObjectId,
                ref:'Movie',
                required:true
            }
        }
    ]
})
userSchema.methods.addMovie = function(movie){
    this.movies.push({movieId:movie._id})
    return this.save();
}
userSchema.methods.deleteMovie = function(movieId){
    const updatedMovies = this.movies.filter(movie => {
        return movie.movieId.toString() !== movieId.toString();
      });
    this.movies = updatedMovies
    return this.save();

}
userSchema.methods.updateMovie = function(movie){
    const movieToUpdate = this.movies.find((m) => m.movieId.toString() === movie._id.toString());
    if (!movieToUpdate) {
        throw new Error('Movie not found');
    }
    // movieToUpdate.title = movie.title;
    movieToUpdate.movieId = movie._id; // Update the reference (if needed)

    return this.save();
}
module.exports = mongoose.model('User',userSchema)
