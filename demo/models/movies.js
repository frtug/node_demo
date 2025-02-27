const movies = [];

module.exports = class Movie{
    constructor(title){
        this.title = title
    }
    save(){
        movies.push(this)
    }
    static getAllMovie(){
        return movies;
    }
}



