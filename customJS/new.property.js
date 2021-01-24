const token = localStorage.getItem("token");

const propertyForm = document.getElementById("propertyForm");

const propertyTitle = document.getElementById("title");
const propertyLocation = document.getElementById("location");
const propertyDescription = document.getElementById("description");
const propertyImage = document.getElementById("image");

const propertyPurpose = document.getElementById("purpose");
const inputPropertyType = document.getElementById("propertyType");
const propertyArea = document.getElementById("area");
const propertyBedroom = document.getElementById("bedroom");
const propertyPrice = document.getElementById("price");

const logOutBtn = document.getElementById("logOut-btn");

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "create-btn") {
    e.preventDefault();
    const data = {
      title: propertyTitle.value,
      description: propertyDescription.value.trim(),
      location: propertyLocation.value,
      purpose:
        propertyPurpose.value === "For Buying or Selling"
          ? ""
          : propertyPurpose.value,
      propertyType:
        inputPropertyType.value === "Property Type"
          ? ""
          : inputPropertyType.value,
      area: propertyArea.value,
      bedroom: propertyBedroom.value,
      price: propertyPrice.value,
    };

    const {
      title,
      description,
      location,
      purpose,
      propertyType,
      area,
      bedroom,
      price,
    } = data;

    if (
      title &&
      description &&
      location &&
      purpose.length &&
      propertyType.length &&
      area &&
      price &&
      propertyImage.files.length
    ) {
      console.log(purpose, propertyType);
      const formData = new FormData();
      console.log(propertyImage.files);
      formData.append("image", propertyImage.files[0]);
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      createProperty(formData);
    } else {
      showModal("All Fields are required", "danger");
    }
  }
});

function createProperty(newProperty) {
  console.log(newProperty);
  fetch(`${baseUrl}/property/`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: newProperty,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      res.json();
    })
    .then(() => {
      showModal("Property created", "success");
      propertyForm.reset();
    })
    .catch((error) => {
      showModal(error, "danger");
    });
}

logOutBtn.addEventListener("click", logOut);
