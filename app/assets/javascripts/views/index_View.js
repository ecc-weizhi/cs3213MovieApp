MovieApp.Views.IndexView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: '#pageBody',
  //template: JST['indexTemplate'](),

  initialize: function(){
    alert("in index view initialize");
    //Fetch the data from http://cs3213.herokuapp.com/movies.json 
    //when we initialize this view
    
    this.myMovieCollection = new MovieApp.Collections.MovieCollection();
    this.myMovieCollection.fetch({reset: true});
    this.myMovieCollection.bind('reset', this.render, this)
  },

  render : function() {
    //This is the render function for this view. We will craft the view here.
    var current = this;
    $(this.el).html("Below is the tiled display");

    this.myMovieCollection.each(function(myMovie) {
      var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);
      $(current.el).append(myMovieSimpleView.render().el);
    });

    return this;
  }
})
