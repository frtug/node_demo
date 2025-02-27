const movies = [];

module.exports = class Movie{
    constructor(title){
        this.title = title
    }
    //  getAllData(){
    //     const d =  fetch('url',{}).then(
    //         (data) => data)
    // }
    save(){
        movies.push(this)
    }
    static getAllMovie(){
        return movies;
    }
}



