var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;

Template.new_post.rendered = function(){
  Session.set("bgColor", document.getElementById("bColor").value);
  Session.set("inkColor", document.getElementById("inkColor").value);
},

Template.new_hand_post.events = {
	'change #bColor': function(){
   		$("#canvas").css("background-color", document.getElementById("bColor").value);
 	 },
	'mousedown #canvas': function(e){
		drawing = true;
		lastX = e.pageX - e.target.offsetLeft;
		lastY = e.pageY - e.target.offsetTop;
	},
	'mouseup #canvas': function(e){
		drawing = false;
	},
	'mousemove #canvas': function(e){
		if(!drawing)
			return;

		var canvas = $('#canvas')[0];
		var ctx = canvas.getContext('2d');
        var x = e.pageX - e.target.offsetLeft;
        var y = e.pageY - e.target.offsetTop;
		ctx.beginPath();
	    ctx.moveTo(lastX, lastY);
	    ctx.lineTo(x, y);
	    ctx.strokeStyle = document.getElementById("inkColor").value;
	    ctx.stroke();
        lastX = x;
        lastY = y;
    },
    'touchstart #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = document.getElementById("inkColor").value;
        ctx.moveTo(touchEvent.pageX - e.target.offsetLeft, touchEvent.pageY - e.target.offsetTop);
    },
    'touchmove #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        e.preventDefault();
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        var x = touchEvent.pageX - e.target.offsetLeft;
        var y = touchEvent.pageY - e.target.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    },
    'click button.submit': function(){
    	image = document.getElementById('canvas').toDataURL('image/png');
    	posTop = parseInt(document.getElementById("posTop").value,10);
    	posLeft = parseInt(document.getElementById("posLeft").value,10);
    	author = $('textarea[name=author]').val();
	    if ( author == ""){
	        author = "Anonymous";
	    }
	    if(isNaN(posTop)|| isNaN(posLeft)){
	        posTop = 50;
	        posLeft = 50;
	    }
        Images.insert({author: author, image: image, posTop: posTop, posLeft: posLeft , date: new Date});
        console.log("image saved");
        alert('Post created!');
        document.getElementById('home').click()
    }
}