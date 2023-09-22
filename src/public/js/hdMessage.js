MessengerExtensions.getSupportedFeatures(function success(result) {
  let features = result.supported_features;
  if (features.indexOf("context") != -1) {
    MessengerExtensions.getContext('269582959293477',
      let userPSID;
      function success(thread_context) {
        // success
        $("#psid").val(thread_context.psid);
        // More code to follow
        handleSaveBtn();
      },
      function error(err) {
        console.log("return content messengerExtension",err);
        $("#psid").val(sender_psid);
        handleSaveBtn();
      }
    );
  }
}, function error(err) {
  console.log(err);
});


function handleSaveBtn() { // Pass psid as a parameter
  // Assuming you have a server endpoint to send the 'foods' data to.
  const serverEndpoint = '/setup-webview';
  let userPSID = $("#psid").val();
  // Prepare the data to send to the server
  const requestData = {
    psid: userPSID,
    foods: foods, // Assuming 'foods' is an object with item data as you've defined
  };

  // Make an HTTP POST request to the server
  fetch(serverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server as needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });

  // Close the webview when the request is initiated
  MessengerExtensions.requestCloseBrowser(
    function success() {
      // Webview closed
    },
    function error(err) {
      // An error occurred while closing the webview
      console.log(err);
    }
  );
}
