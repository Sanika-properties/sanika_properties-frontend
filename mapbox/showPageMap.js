const propertyId = window.location.search.split("=")[1];

const showProperty = async () => {
  try {
    const data = await getOneProperty(propertyId);
    if (data.error) {
      throw new Error("something went wrong");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

showProperty().then(({ geometry, title, location }) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXJ2aW5kLXNpbmdoIiwiYSI6ImNrZXNkdHNkdzI1enoydHFtNWhhc3RwaG0ifQ.fpqZnJUUWMLZDJJq0Yuhiw";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  new mapboxgl.Marker()
    .setLngLat(geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${title}</h3><p>${location}</p>`
      )
    )
    .addTo(map);
});
