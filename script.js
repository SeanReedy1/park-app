`use strict`
function getPark(park, state, maxResults) {
    let baseUrl="https://developer.nps.gov/api/v1/parks/";
    let apiKey="gpMC22DNtiQuAt9uouzWqHrRBMwRvrAriqCQkNio"
    const params={
      q: park,
      stateCode: state,
      limit: maxResults
    }

    const queryString=formatParams(params);
    const url=baseUrl+"?"+queryString+"&api_key=" + apiKey;
    console.log(url);
  
    fetch(url)
    .then(response => {
      return response.json();
      
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  })};

  function formatParams(params) {
    const formattedParams=Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return formattedParams.join("&");
  
  }
  
  function watchForm(){
    $("form").submit(event => {
      event.preventDefault();
      let park=$(".park").val();
      let state=$(".state").val();
      let maxResults=$(".maxResults").val();
  
      getPark(park, state, maxResults);
    })
  }
  
  function displayResults(response) {
    
    $("#results-list").empty();
    if(response.total==="0") {
      $("#results-list").append(`<li>No Results Found </li>`)
      $("#results").removeClass('hidden');
    }
   
    for(let i=0; i<response.data.length; i++) {
     
      $("#results-list").append(
        `<li>
          <h3>${response.data[i].name}
          </h3>
          <h4>${response.data[i].description}</h4>
          <h4><a href="${response.data[i].url}">${response.data[i].url}</a>
         </h4>
        </li>`
         
      )
      $('#results').removeClass('hidden');
    }
  }
  
  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  })