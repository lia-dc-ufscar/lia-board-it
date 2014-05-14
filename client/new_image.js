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
      height = $('#preview').height();
      width = $('#preview').width();      

      if ( author == ""){
        author = "Anonymous";
      }
      if(isNaN(posTop)|| isNaN(posLeft)){
        posTop = 50;
        posLeft = 50;
      }
      if(/^data\:image\/(png|jpg|jpeg)\;/.test(image)){
        Images.insert({author: author, image: image, posTop: posTop, posLeft: posLeft , date: new Date});
        console.log("image saved");
        alert('Post created!');
        document.getElementById('home').click()
      }
      else{

      }
    },
    'click button.cancel': function(){
      document.getElementById('home').click()
    }
}