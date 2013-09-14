MovieApp.Collections.MovieCollection = Backbone.Collection.extend({
  //model: MovieApp.Models.MovieModel,
  url: "http://cs3213.herokuapp.com/movies.json",
    
  initialize: function(){
  }
});
