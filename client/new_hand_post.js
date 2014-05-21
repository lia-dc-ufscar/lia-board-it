var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;

Template.new_hand_post.rendered = function(){
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = document.getElementById("stroke").value;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
}

Template.new_hand_post.events = {
	'change #bColor': function(){
        backgroundColor= document.getElementById("bColor").value;
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
     },
    'click .clear': function(){
        canvas = $('#canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    	posTop = 50; //parseInt(document.getElementById("posTop").value,10);
    	posLeft = 50; //parseInt(document.getElementById("posLeft").value,10);
    	//author = $('textarea[name=author]').val();
	    /*
        if ( author == ""){
	        author = "Anonymous";
	    }
	    if(isNaN(posTop)|| isNaN(posLeft)){
	        posTop = 50;
	        posLeft = 50;
	    }
        */
        Images.insert({/*author: author, */image: image, posTop: posTop, posLeft: posLeft , date: new Date});
        console.log("image saved");
        alert('Post created!');
        document.getElementById('home').click()
    }
}