var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;

var clearCanvas = function(){
    canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    console.log('cleared');    
};

Template.teste.drawsteps = function(){
  return Drawsteps.find({}, {sort: {date: -1}});
}

Template.teste.rendered = function(){
	drawsteps = Drawsteps.find({}, {sort: {date: -1}});
    globalStream.on('clear', function(message){
        clearCanvas();
    });
    /*
    globalSream.on('drawstep', function(x,y)){
        var canvas = $('#canvas2')[0];
        var ctx = canvas.getContext('2d');
    };
    */
}
Template.step.rendered = function(e){
    var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
    ctx.moveTo(this.data.begin.x, this.data.begin.y);
    ctx.lineTo(this.data.end.x, this.data.end.y);
    ctx.stroke();

    /*
	debugger
	$('.line').each(function(){
		console.log('here');
		values = $(this).text().split(",")
	    ctx.beginPath();
	    ctx.moveTo(parseInt(values[0],10), parseInt(values[1],10));
	    ctx.lineTo(parseInt(values[2],10),parseInt(values[3],10));
	    ctx.stroke();
	    $(this).remove();
	});
	console.log('rendered');
	*/
}

Template.teste.events = {
	'mousemove #canvas': function(e){
		if(!drawing)
			return;
        var x = e.pageX - e.target.offsetLeft;
        var y = e.pageY - e.target.offsetTop;
        Drawsteps.insert({begin: {x: lastX, y: lastY}, end: {x: x, y:y}, date: new Date});
        lastX = x;
        lastY = y;
        drawsteps = Drawsteps.find({}, {sort: {date: -1}});
	},
	'mousedown #canvas': function(e){
		drawing = true;
		lastX = e.pageX - e.target.offsetLeft;
		lastY = e.pageY - e.target.offsetTop;
	},
	'mouseup #canvas': function(e){
		drawing = false;
	},
	'click .btn-default': function(){
		Meteor.call('clear_canvas', function(err){
            console.log('Success!');
        });
        globalStream.emit('clear', {});
        //clearCanvas();
	},
    'touchstart #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(touchEvent.pageX - e.target.offsetLeft, touchEvent.pageY - e.target.offsetTop);
    },
    'touchmove #canvas': function(e){
        var touchEvent = e.originalEvent.changedTouches[0];
        e.preventDefault();
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        Drawsteps.insert({begin: {x: lastX, y: lastY}, end: {x: x, y:y}, date: new Date});
        var x = touchEvent.pageX - e.target.offsetLeft;
        var y = touchEvent.pageY - e.target.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
/*
(function() {
    // Creates a new canvas element and appends it as a child
    // to the parent element, and returns the reference to
    // the newly created canvas element


    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || '100%';
        canvas.node.height = height || '100%';
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);
        var ctx = canvas.context;
        // define a custom fillCircle method
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        // bind mouse events
        var i = 1;
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
               i = 1;
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 10; // or whatever
            var fillColor = '#ff0000';
            ctx.fillCircle(x, y, radius, fillColor);
            i++;
        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
            alert(i);
        };
    }

    var container = document.getElementById('canvas');
    init(container, 200, 200, '#ddd');

})();
*/