MovieApp.Views.EditMovieView = Backbone.View.extend({
	el: '#pageBody',
	template: JST['edit_movie_Template'](),

	initialize : function(id) {
		var current = this;
		this.model = new MovieApp.Models.MovieModel(id);
		this.model.fetch({
			success : function() {
				current.render();
			}
		});		
	},

	render : function() {
		var myNavBarView = new MovieApp.Views.NavBarView();
    	$(this.el).html(myNavBarView.render().el);
		$(this.el).append(this.template);	
		document.getElementById('title').value = this.model.get('title');
		document.getElementById('summary').value = this.model.get('summary');

		return this;
	},

	events : {
		"click #submit" : "updateMovie",
		"click #cancel" : "returnToUserMovies",
	},

	updateMovie : function() {
		var title = document.getElementById('title').value;
		var summary = document.getElementById('summary').value
		// this.model.set("title", );
		// this.model.set("summary", document.getElementById('summary').value);	
		var filename = document.getElementById('imageUpload').value;
		var lastIndex = filename.lastIndexOf("\\");
		
    	if (lastIndex >= 0) 
        	filename = filename.substr(lastIndex + 1);

		$.ajax({
		    type: 'PUT',
		    url: 'app/public/',
		    processData: false,
		    contentType: false,
		    data: filename,
		    success: function() { alert("file upload success"); },
		    error: function() { alert("file upload failure"); }
		  });
  

		//window.router.navigate("updateMovie/" + this.model.get('id') + "/" + title + "/" + summary, {trigger : true});
	}, 
	
	returnToUserMovies : function() {
		window.router.navigate("myMovies", {trigger : true});
	},


});