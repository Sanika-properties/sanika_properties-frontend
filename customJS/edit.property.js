// const baseUrl = "https://sanika-properties.herokuapp.com";
const token = localStorage.getItem("token");

const propertyId = window.location.search.split("=")[1];

const logOutBtn = document.getElementById("logOut-btn");
const propertyTitle = document.getElementById("title");
const propertyLocation = document.getElementById("location");
const propertyDescription = document.getElementById("description");

const propertyImage = document.getElementById("image");

const propertyPurpose = document.getElementById("purpose");
const inputPropertyType = document.getElementById("propertyType");
const propertyArea = document.getElementById("area");
const propertyBedroom = document.getElementById("bedroom");
const propertyPrice = document.getElementById("price");

function showProperty(incomingResponse) {
  propertyTitle.setAttribute("value", incomingResponse.title);
  propertyLocation.setAttribute("value", incomingResponse.location);
  propertyDescription.append(incomingResponse.description);
  propertyArea.setAttribute("value", incomingResponse.area);
  propertyPrice.setAttribute("value", incomingResponse.price);
  $("#purpose").val(incomingResponse.purpose);
  $("#propertyType").val(incomingResponse.propertyType);
  $("#bedroom").val(incomingResponse.bedroom);
}

getOneProperty()
  .then(showProperty)
  .catch((err) => {
    console.log(err);
    window.location.replace("../login.html");
  });

const form = document.getElementById("property-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: propertyTitle.value,
    description: propertyDescription.value.trim(),
    location: propertyLocation.value,
    purpose: propertyPurpose.value,
    propertyType: inputPropertyType.value,
    area: propertyArea.value,
    bedroom: propertyBedroom.value,
    price: propertyPrice.value,
  };
  if (!data.bedroom) {
    delete data["bedroom"];
  }
  editProperty(data);
});

function editProperty(editedProperty) {
  fetch(`${baseUrl}/property/${propertyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editedProperty),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      res.json();
    })
    .then((data) => {
      console.log(data);
      showModal("Property updated", "success");
    })
    .catch((err) => {
      showModal(err, "danger");
    });
}

logOutBtn.addEventListener("click", logOut);
