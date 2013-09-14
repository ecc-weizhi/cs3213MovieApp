MovieApp.Views.IndexView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: '#pageBody',
  //template: JST['indexTemplate'](),

  initialize: function(){
    //Fetch the data from http://cs3213.herokuapp.com/movies.json 
    //when we initialize this view
    
    this.myMovieCollection = new MovieApp.Collections.MovieCollection();
    this.myMovieCollection.fetch({reset: true});
    this.myMovieCollection.bind('reset', this.render, this)
  },

  events: {
    //create an event "click on CreateMovie class" will trigger function "create_new_movie" 
    "click .CreateMovie": "create_new_movie"
  },

  render : function() {
    //This is the render function for this view. We will craft the view here.
    var current = this;
    $(this.el).html("<h1>Below is the tiled display</h1>");
    $(this.el).append("<div id='buttonArea'><button class='CreateMovie' type='button'>Create new movie</button><div>");

    this.myMovieCollection.each(function(myMovie) {
      var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);
      $(current.el).append(myMovieSimpleView.render().el);
    });

    return this;
  },

  create_new_movie : function() {
    window.router.navigate("create", {trigger: true});
  }
})
