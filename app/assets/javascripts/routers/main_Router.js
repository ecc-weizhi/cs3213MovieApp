MovieApp.Routers.MainRouter = Backbone.Router.extend({
  //This file will list which methods to perform base on the url.
  
  routes: {
    "":                 "index",    // #help
    "movie/:id":        "movie",  // #search/kiwis
    "create":	"createMovie"
  },

  index: function() {
    //create a view to display all movie.
    var myIndexView = new MovieApp.Views.IndexView();
  },

  movie: function(id) {
    var movieView = new MovieApp.Views.MovieDetailView({"id":id});
  },
  
  createMovie: function(){
    var myMovieCreateView = new MovieApp.Views.MovieCreateView();
    myMovieCreateView.render();
  }
});
