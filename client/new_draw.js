var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;
var resizing = false;

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