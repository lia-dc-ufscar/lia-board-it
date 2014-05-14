Template.screen.posts = function(){
  return Posts.find({}, {sort: {date: -1}});
}

Template.screen.images = function(){
	return Images.find({}, {sort: {date: -1}});
}

Template.post.rendered = function(){
	self = '#'+this.data._id;
	$(self).resizable({
		maxHeight: 1000,
    	maxWidth: 1000,
    	minHeight: 50,
    	minWidth: 50,
		stop:function(){
			var height = this.style.height;
			var width = this.style.width;
			Posts.update(this.id, {$set: {height: height, width: width}});
		}
	});
	$(self).draggable({
		start: function( event, ui ) {
			console.log("picked");
		},
		stop: function( event, ui ) {
			var top = parseInt(this.style.top, 10);
			var left = parseInt(this.style.left, 10);
			//console.log("Post "+ this.id + " dropped at: " + top +" top, "+ left + " left");
			Posts.update(this.id, {$set: {posTop: top, posLeft: left}});
		}
	});
}

Template.post_image.rendered = function(){
	console.log("rendered");
	self = '#'+this.data._id;
	$(self).draggable({
		start: function( event, ui ) {
			console.log("picked");
		},
		stop: function( event, ui ) {
			var top = parseInt(this.style.top, 10);
			var left = parseInt(this.style.left, 10);
			console.log("Post "+ this.id + " dropped at: " + top +" top, "+ left + " left");
			Images.update(this.id, {$set: {posTop: top, posLeft: left}});
		}
	});
}

Template.post.author = function(){
	return (this.author == "Anonymous") ? "" : this.author;
}