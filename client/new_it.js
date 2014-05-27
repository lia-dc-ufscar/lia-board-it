Template.new_it.rendered = function(){
  $('#postpreview').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
  Session.set('post_type', 'text');
}

Template.imagePreview.rendered = function(){
  $('#postpreview').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
  height > width ? (height > 500 ? document.getElementById("postpreview").style.height = '500px' : console.log("false")) : (width > 500 ? document.getElementById("postpreview").style.width = '500px' : console.log("false"));
}

Template.textPreview.rendered = function(){
  $('#postpreview').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
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
    $('#postpreview h4').html($('textarea[name=content]').val().replace(/\n/gi, '<br>'));
  },

  'click .postType': function(e){
  	$('.postType').removeClass('active');
  	$(e.target).addClass('active');
  	Session.set('post_type', $(e.target).val());
  },

  'click button.submit': function(){
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
	      Its.insert (newPost);
	      alert("Post created!");
	      document.getElementById('home').click()
	    }
	    else{
	      alert("Digite o conteúdo do post");
	    }
	}
	if (newPost.type == "image"){
		newPost.content = $('#postpreview').attr('src');
		if(/^data\:image\/(png|jpg|jpeg)\;/.test(newPost.content)){
			Its.insert(newPost);
			alert('Post created!');
        	document.getElementById('home').click();
    	};
	}
	if(Session.equals('post_type', 'draw')){
		newPost.content = document.getElementById('canvas').toDataURL('image/png');
		Its.insert(newPost);
		alert('Post created!');
        document.getElementById('home').click();
	}
  },

  'click button.cancel': function(){
    document.getElementById('home').click()
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
	      height > width ? (height > 500 ? document.getElementById("postpreview").style.height = '500px' : console.log("false")) : (width > 500 ? document.getElementById("postpreview").style.width = '500px' : console.log("false"));
	      height = $('#postpreview').height();
	      width  = $('#postpreview').width();
	      document.getElementsByClassName("resizable").style.height = height;
	      document.getElementsByClassName("resizable").style.height	= width;    
	  }
	  
	  reader.readAsDataURL(input.files[0]);
	}
  }
}
