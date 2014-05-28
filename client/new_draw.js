var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;
var resizing = false;
var originalHeight = 400;
var originalWidth = 400;

Template.drawPreview.rendered = function(){
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = document.getElementById("stroke").value;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}

Template.drawEditor.events = {
	'change #bgColor': function(){
        backgroundColor= document.getElementById("bgColor").value;
        if(backgroundColor == "transparent"){
            canvas = $('#canvas')[0];
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        canvas = $('#canvas')[0];
        ctx = canvas.getContext('2d');
		ctx.fillStyle = backgroundColor;
        console.log('color is now ' + ctx.fillStyle);
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
 	 },
    'change #stroke': function(){
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        stroke = document.getElementById("stroke").value;
        if (stroke < 1)
            stroke = 1;
        if (stroke > 20)
            stroke = 20;
        ctx.lineWidth = stroke;
        console.log(ctx.lineWidth);
    }
}
Template.drawPreview.events = {
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
        console.log(x);
        var y = e.pageY - e.target.offsetTop;
        var currentWidth = $('#canvas').width();
        var currentHeight = $('#canvas').height();
        var relX = (x/currentWidth)*originalWidth;
        var relLastX = (lastX/currentWidth)*originalWidth;
        var relY = (y/currentHeight)*originalHeight;
        var relLastY = (lastY/currentHeight)*originalHeight;
		ctx.beginPath();
	    ctx.moveTo(relLastX, relLastY);
	    ctx.lineTo(relX, relY);
	    ctx.strokeStyle = document.getElementById("inkColor").value;
	    ctx.stroke();
        lastX = x;
        lastY = y;
    },
    'touchstart #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        lastX = touchEvent.pageX - e.target.offsetLeft;
        lastY = touchEvent.pageY - e.target.offsetTop;
    },
    'touchmove #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        e.preventDefault();
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        var x = touchEvent.pageX - e.target.offsetLeft;
        var y = touchEvent.pageY - e.target.offsetTop;
        var currentWidth = $('#canvas').width();
        var currentHeight = $('#canvas').height();
        var relX = (x/currentWidth)*originalWidth;
        var relLastX = (lastX/currentWidth)*originalWidth;
        var relY = (y/currentHeight)*originalHeight;
        var relLastY = (lastY/currentHeight)*originalHeight;
        ctx.beginPath();
        ctx.moveTo(relLastX, relLastY);
        ctx.lineTo(relX, relY);
        ctx.strokeStyle = document.getElementById("inkColor").value;
        ctx.stroke();
        lastX = x;
        lastY = y;
    },
    'click .clear': function(){
        canvas = $('#canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    'click .resize': function(){
        if(!resizing){
            $('#canvas').resizable({
                maxHeight: 1000,
                maxWidth: 1000,
                minHeight: 50,
                minWidth: 50
            });
            $(".resize").html("Stop Resizing");
            resizing = true;
        }
        else{
            resizing = false;
            $('#canvas').resizable('destroy');
            $(".resize").html("Resize Canvas");
        }
    }
}