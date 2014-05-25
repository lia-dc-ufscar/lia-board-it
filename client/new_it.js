var canvas;
var ctx;
var drawing = false;
var lastX = 0;
var lastY = 0;

Template.new_it.rendered = function(){
  $('.resizable').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
  Session.set('post_type', 'text');
}

Template.drawPreview.rendered = function(){
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = document.getElementById("stroke").value;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}
Template.new_it.isText = function(){
	return Session.equals('post_type', 'text');
}

Template.new_it.isImage = function(){
	return Session.equals('post_type', 'image');
}

Template.new_it.isDraw = function(){
	return Session.equals('post_type', 'draw');
}

Template.new_it.events = {

  'change #bColor': function(){
    $('#postpreview').css("background-color", document.getElementById("bColor").value);
  },
  'change #fColor': function(){
    $('#postpreview').css("color", document.getElementById("fColor").value);  
  },
  'change textarea[name=content]': function(){
    $('#postpreview h4').html($('textarea[name=content]').val().replace('\n', '<br>'));
  },
  'click button.submit': function(){
    /*
    content = $('textarea[name=content]').val();
    bgColor = document.getElementById("bColor").value;
    fontColor = document.getElementById("fColor").value;
    posTop = 50; //parseInt(document.getElementById("posTop").value,10);
    posLeft = 50; //parseInt(document.getElementById("posLeft").value,10);
    height = $('.postpreview').height();
    width = $('.postpreview').width();
    */
    type = Session.get('post_type');
    if(Session.equals('post_type', 'draw'))
    	type = 'image';
    newPost = new It(type);
    newPost.height = $('#postpreview').height();
    newPost.width = $('#postpreview').width();
    newPost.date = new Date;

    if(newPost.type == "text"){
    	newPost.content = $('textarea[name=content]').val();
    	newPost.bgColor = document.getElementById("bColor").value;
    	newPost.fontColor = document.getElementById("fColor").value;
	    if (newPost.content != "" ){
	      Posts.insert (newPost);
	      alert("Post created!");
	      document.getElementById('home').click()
	    }
	    else{
	      alert("Digite o conteúdo do post");
	    }
	}
	if (newPost.type == "image"){
		newPost.image = $('#postpreview').attr('src');
		if(/^data\:image\/(png|jpg|jpeg)\;/.test(newPost.image)){
			Images.insert(newPost);
			alert('Post created!');
        	document.getElementById('home').click();
    	};
	}
	if(Session.equals('post_type', 'draw')){
		newPost.image = document.getElementById('canvas').toDataURL('image/png');
		Images.insert(newPost);
		alert('Post created!');
        document.getElementById('home').click();
	}
  },

  'click button.cancel': function(){
    document.getElementById('home').click()
  },
  'click .postType': function(e){
  	$('.postType').removeClass('active');
  	$(e.target).addClass('active');
  	Session.set('post_type', $(e.target).val());
  },
  'change #imgInput': function(e){
	console.log(e.target);
	input = e.target;
	if (input.files && input.files[0]) {
	  var reader = new FileReader();
	  
	  reader.onload = function (e) {
	      if($('#postpreview').length > 0)
	        $('#postpreview').attr('src', e.target.result);
	      height = $('#postpreview').height();
	      width  = $('#postpreview').width();
	      if(height > 500){
	        document.getElementById("postpreview").style.height = '500px';
	        return true;
	      }
	      else if(width > 500){
	        document.getElementById("postpreview").style.width = '500px';
	        return true;
	      };
	  }
	  
	  reader.readAsDataURL(input.files[0]);
	}
  },
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
    }
}