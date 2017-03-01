/*
  Purpose: Pass information to other helper functions after a user clicks 'Predict'
  Args:
    value - Actual filename or URL
    source - 'url' or 'file'
*/
function predict_click(value, source) {
  
  if(source == 'url') {
    document.getElementById('img_preview').src = value;
    doPredict({ url: value });
    document.getElementById("hidden-type").value = "url";
    document.getElementById("hidden-val").value = value;
  }
    
  else if(source == 'file') {
    var preview = document.querySelector('#img_preview');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    // load local file picture
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      var local_base64 = reader.result.split("base64,")[1];
      doPredict({ base64: local_base64 });
      document.getElementById("hidden-type").value = "base64";
      document.getElementById("hidden-val").value = local_base64;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  } 
}

/*
  Purpose: Does a v2 prediction based on user input
  Args:
    value - Either {url : url_value} or { base64 : base64_value }
*/
function doPredict(value) {

  var model_id = getSelectedModel();

  clarifai.models.predict(model_id, value).then(
    
    function(response) {
      let concept_names = "";
      var tag_array;
      var tag_count = 0;
      var model_name = response.rawData.outputs[0].model.name;
      
      // Check for color model since it has its own unique JSON
      if(model_name = "NSFW") {
        tag_array = response.rawData.outputs[0].data.concepts;
        
        for (let i = 0; i < tag_array.length; i++) 
          concept_names += '<li>' + tag_array[i].name + ': <i>' + tag_array[i].value + '</i></li>';
          
        tag_count=tag_array.length;
      }
      
      var column_count = tag_count / 10;
      
      concept_names = '<ul style="margin-right:20px; margin-top:20px; columns:' + column_count + '; -webkit-columns:' + column_count + '; -moz-columns:' + column_count + ';">' + concept_names;
        
      concept_names += '</ul>';
      $('#concepts').html(concept_names);
      
      document.getElementById("add-image-button").style.visibility = "visible";
    },
    function(err) {
      console.log(err);
    }
  );
}

/*
  Purpose: Return a back-end model id based on current user selection
  Returns:
    Back-end model id
*/
function getSelectedModel() {
  var model = document.querySelector('input[name = "model"]:checked').value;
    
  if(model == "NSFW")
    return Clarifai.NSFW_MODEL;
}

/*
  Purpose: Add an image to an application after user clicks button
  Args:
    index - # of the image in the session
*/
// function addImageToApp() {
//   var img_type = document.getElementById("hidden-type").value;
//   var img_value = document.getElementById("hidden-val").value;
  
//   if(img_type == "url") {
//     clarifai.inputs.create({
//       url: img_value
//     }).then(
//       function(response) {
//         alert("Image successfully added!");
//       },
//       function(err) {
//         alert(err);
//       }
//     );
//   }
  
//   else if(img_type == "base64") {
//     clarifai.inputs.create({
//       base64: img_value
//     }).then(
//       function(response) {
//         alert("Image successfully added!");
//       },
//       function(err) {
//         alert("Error Adding Image. Check to see if it is a duplicate.");
//       }
//     );
//   }
// }
