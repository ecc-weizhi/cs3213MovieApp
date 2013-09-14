MovieApp.Views.MovieDetailView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody', 

  initialize: function(id){
    //we keep a variable pointing to "this" because "this" can change later
    var current = this;
    
    //Fetch the movie data from http://cs3213.herokuapp.com/movies/(id).json
    //when we initialize this view
    this.myMovie = new MovieApp.Models.MovieModel(id);
    this.myReviewCollection = new MovieApp.Collections.ReviewCollection(id);

    this.myMovie.fetch({
      success: function(){
        current.myReviewCollection.fetch({
          success: function(){
            current.render();
          }
        });
      }
    });
  },

  events: {
    //create an event "click on Back class" will trigger function "back_to_list" 
    "click .Back": "back_to_list"
  },

  render: function() {
    //we keep a variable pointing to "this" because "this" can change later
    var current = this;

    $(this.el).html("<div id='buttonArea'><button class='Back' type='button'>Back to list</button><div>")

    $(this.el).append("<div id='movieDetail'>");
    $(this.el).append("<h1>" + this.myMovie.get("title") + "</h1>");
    $(this.el).append("<img src='" + this.myMovie.get("img_url") + "'>");
    $(this.el).append("<p> Summary:" + this.myMovie.get("summary") + "</p>");
    $(this.el).append("<p> Updated at:" + this.myMovie.get("updated_at") + "</p>");
    $(this.el).append("</div>");

    this.myReviewCollection.each(function(myReview) {
      var myReviewView = new MovieApp.Views.ReviewView(myReview);
      $(current.el).append(myReviewView.render().el);
    });
 
    return this;
  },


  back_to_list : function() {
    window.router.navigate("", {trigger: true});
  }
})
