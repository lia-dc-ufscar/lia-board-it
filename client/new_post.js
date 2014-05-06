Template.new_post.rendered = function(){
  Session.set("size", document.getElementById("size").value);
  Session.set("bgColor", document.getElementById("bColor").value);
  Session.set("fontColor", document.getElementById("fColor").value);
  $('.resizable').resizable();
},
Template.new_post.events = {
  'change #bColor': function(){
    Session.set("bgColor", document.getElementById("bColor").value);
  },
  'change #fColor': function(){
    Session.set("fontColor", document.getElementById("fColor").value);
  },
  'change #size': function(){
    Session.set("size", document.getElementById("size").value);
  },
  'change textarea[name=content]': function(){
    Session.set("content", $('textarea[name=content]').val());
  }, 
  'change textarea[name=author]': function(){
    $('textarea[name=author]').val() == "" ? Session.set("author", "Anonymous") : Session.set("author", $('textarea[name=author]').val())
  },

  'click button.submit': function(){
    author = $('textarea[name=author]').val();  
    content = $('textarea[name=content]').val();
    bgColor = document.getElementById("bColor").value;
    fontColor = document.getElementById("fColor").value;
    size = document.getElementById("size").value;
    posTop = parseInt(document.getElementById("posTop").value,10);
    posLeft = parseInt(document.getElementById("posLeft").value,10);

    if ( author == ""){
      author = "Anonymous";
    }
    if ( content != "" ){
      Posts.insert ({author: author, content: content, bgColor: bgColor, fColor: fontColor, size: size, posTop: posTop, posLeft: posLeft,date: new Date});
      alert("Post created!");
      $('#home').click();
    }
    else{
      alert("Digite o conteúdo do post");
    }
  },
  'click button.cancel': function(){
    $('#home').click();
  }
},

Template.new_post.size_set = function(){
      return Session.get("size");
},

Template.new_post.bgColor_set = function(){
      return Session.get("bgColor");
},

Template.new_post.fColor_set = function(){
      return Session.get("fontColor");
},
Template.new_post.author_set = function(){
      return Session.get("author");
},
Template.new_post.content_set = function(){
      return Session.get("content");
},
Template.new_post.has_author = function(){
      return !Session.equals("author", "Anonymous");
},

//image
Template.new_image.events = {
    'change #imgInput': function(e){
      console.log(e.target);
      input = e.target;
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function (e) {
              if($('#preview').length > 0)
                $('#preview').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]);
      }
    },
    'click .submit': function(){
      image = $('#preview').attr('src');
      posTop = parseInt(document.getElementById("posTop").value,10);
      posLeft = parseInt(document.getElementById("posLeft").value,10);
      author = $('textarea[name=author]').val();  
      
      if ( author == ""){
        author = "Anonymous";
      }
      Images.insert({author: author, image: image, posTop: posTop, posLeft: posLeft , date: new Date});
      console.log("image saved");
      $('#home').click();
    },
    'click button.cancel': function(){
    $('#home').click();
    }
}