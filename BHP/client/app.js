function getBathValue() {
    // Get the select element by its ID
    var selectElement = document.getElementById("bathrooms");
   
    // Get the selected value
    var selectedValue = selectElement.value;
  if(!selectedValue){
 
    // Return the selected value
    return -1;
  }
  // Invalid Value
  return selectedValue;
   }
   
   function getBHKValue() {
     
       // Get the select element by its ID
       var selectElement = document.getElementById("bhk");
   
       // Get the selected value
       var selectedValue = selectElement.value;
     if(!selectedValue){
 
       // Return the selected value
       return -1;
     }
     // Invalid Value
     return selectedValue;
   }
   
   function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    var sqft = document.getElementById("area").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("location").value;
    var estPrice = document.getElementById("priceResult");

    var url = "http://127.0.0.1:5000/predict_home_price"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        console.log(data.estimated_price);
        
        // Convert estimated_price to positive if it's negative
        var estimatedPrice = data.estimated_price < 0 ? -data.estimated_price : data.estimated_price;
        
        estPrice.innerHTML = "<h2>" + estimatedPrice.toString() + " Lakh</h2>";
        console.log(status);
    });
}

   
   function onPageLoad() {
    console.log("document loaded");

    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if (data && data.locations) { // Check if data and data.locations exist
            var locations = data.locations;
            
            var selectElement = document.getElementById("location");
            
            // Clear previous options
            $('#location').empty();
            
            for (var i = 0; i < locations.length; i++) {
                var location = locations[i];
                
                // Create a new option element
                var opt = new Option(location, location);
                
                // Append the new option to the select element
                selectElement.appendChild(opt);
            }
        }
    });
}


// Call onPageLoad when the document is ready
$(document).ready(function() {
    onPageLoad();
});

   
  // window.onload = onPageLoad;