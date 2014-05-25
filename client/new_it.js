Template.new_it.rendered = function(){
  $('.resizable').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
  Session.set('post_type', 'text');
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
  }
}
