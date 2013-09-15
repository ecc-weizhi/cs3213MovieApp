MovieApp.Views.IndexView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: '#pageBody',
  //template: JST['indexTemplate'](),

  initialize: function(){
    //Fetch the data from http://cs3213.herokuapp.com/movies.json 
    //when we initialize this view
    this.collection = new MovieApp.Collections.MovieCollection();
    this.collection.fetch({reset: true});
    this.collection.bind('reset', this.render, this);    
  },

  events: {
    //create an event "click on CreateMovie class" will trigger function "create_new_movie" 
    "click .CreateMovie": "create_new_movie",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

  render : function() {
    console.log(this.collection);
    var current = this;
    
    //This is the render function for this view. We will craft the view here.
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);
    
    $(this.el).append("<h1>Below is the tiled display</h1>");
    $(this.el).append("<div id='buttonArea'><button class='CreateMovie' type='button'>Create new movie</button><div>");

    this.collection.each(function(myMovie) {
      var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);
      $(current.el).append(myMovieSimpleView.render().el);
    });

    return this;
  },

  create_new_movie : function() {
    window.router.navigate("create", {trigger: true});
  },

  go_index : function() {
    window.router.navigate("", {trigger: true});
  },
  
  go_my_movie : function() {
    window.router.navigate("myMovies", {trigger: true});
  },

  go_logout : function() {
    window.location="logout.html";
  }
})
