Template.board.its = function(){
	return Its.find({});
}
Template.board.content = function(){
	return this.content.replace('\n', '<br>');
}
Template.it.isText = function(){
	return this.type == 'text';
}
Template.it.isImage = function(){
	return this.type == 'image';
}

Template.it.content = function(){
	return this.content.replace(/\n/gi, '<br>');
}

Template.board.rendered = function(){
	$('#trash').droppable({
		accept: ".post",
		drop: function(e){
			console.log(e.toElement.id);
			Its.remove(e.toElement.id);
		}
	});
}

Template.it.rendered = function(){
	self = '#'+this.data._id;
	$(self).resizable({
		maxHeight: 1000,
    	maxWidth: 1000,
    	minHeight: 50,
    	minWidth: 50,
		stop:function(){
			var height = parseInt(this.style.height,10);
			var width = parseInt(this.style.width,10);
			Its.update(this.id, {$set: {height: height, width: width}});
		}
	});
	$(self).draggable({
		start: function( event, ui ) {
			console.log("picked");
		},
		stop: function( event, ui ) {
			var top = parseInt(this.style.top, 10);
			var left = parseInt(this.style.left, 10);
			Its.update(this.id, {$set: {posTop: top, posLeft: left}});
		}
	});
}

Template.board.events = {
	'click .post': function(e){
		console.log(e.target.id);
		if(e.which == 1){
			console.log('left clicked');
			Its.update(e.target.id, {$inc: {zIndex: 1}});
		}
	},
	'mousedown .post': function(e){
		if(e.which == 3){
			console.log('right clicked');
			Its.update(e.target.id, {$inc: {zIndex: -1}});			
		}		
	}
}

document.oncontextmenu = function(){
	return false;
}