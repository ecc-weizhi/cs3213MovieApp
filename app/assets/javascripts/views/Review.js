//reviewPanel that prints the list of reviews.


MovieApp.Views.Review = Backbone.View.extend({

	el: "#second",
      	initialize: function(){
           
      	},
	col: function(id){
	   $(this.el).html("<h3> Review goes here </h3>");
	   this.collection = new MovieApp.Collections.ReviewList({movie_id: id});
	   this.collection.fetch({reset: true});
 	   this.collection.bind('reset', this.render, this)
	   

	 },
         render:function(){
	 var current = this;
	 this.collection.each(function(rm) {
               var reviewView = new MovieApp.Views.ReviewPreview(rm);
	       $(current.el).append(reviewView.render().el);
         });
         return this;
	
      },
});
