MovieApp.Routers.MainRouter = Backbone.Router.extend({
  //This file will list which methods to perform base on the url.
  
  routes: {
    "":                 "index",    // #help
    "movie/:id":        "movie",  // #search/kiwis
  },

  index: function() {
    alert('in mainRouter. "" is found');
    //var movieModel = new MovieApp.Model.Movie();
    
    //create a view to display all movie.
    var myIndexView = new MovieApp.Views.IndexView();
  },

  movie: function(id) {
    var movieView = new MovieApp.Views.MovieDetail();
    movieView.render();
  }
});
