const propertyDiv = document.getElementById("property");

const propertyId = window.location.search.split("=")[1];

function displayTemplate(incomingResponse) {
  console.log(incomingResponse);
  propertyDiv.outerHTML = `
  <div class="card">  
  <img src="${
    incomingResponse.images[0].url
  }" alt="" class="card-img-top img-fluid">
  <ul class="list-group list-group-flush">
    
    <li class="list-group-item">${
      incomingResponse.purpose === "Sell" ? "For Sale" : "For Purchase"
    }</li>
    <li class="list-group-item"><i class="fas fa-map-marker-alt"></i> ${
      incomingResponse.location
    }</li>
    <li class="list-group-item">${incomingResponse.propertyType}</li>
    <li class="list-group-item">${incomingResponse.area} Sq.Ft</li>
    <li class="list-group-item"><i class="fas fa-rupee-sign"></i> ${
      incomingResponse.price
    } Lakhs</li>
  </ul>
  <div class="card-footer">
    <p class="text-muted font-weight-light font-italic">${
      incomingResponse.description
    }</p>
  </div>
  
  
</div>
        `;
}

getOneProperty()
  .then(displayTemplate)
  .catch((err) => {
    console.log(err);
    window.location.replace("../login.html");
  });
