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
		$(this.el).html(this.template);	
		document.getElementById('title').value = this.model.get('title');
		document.getElementById('summary').value = this.model.get('summary');

		return this;
	},

	events : {
		"click #submit" : "updateMovie",
		"click #cancel" : "returnToUserMovies",
	},

	updateMovie : function() {
		this.model.set("title", document.getElementById('title').value);
		this.model.set("summary", document.getElementById('summary').value);	
		window.router.navigate("updateMovie/" + this.model.get('id'), {trigger : true});
	}, 
	
	returnToUserMovies : function() {
		window.router.navigate("myMovies", {trigger : true});
	},


});