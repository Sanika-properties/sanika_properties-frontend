const cities = [
  "Greater Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Thane",
  "Aurangbad",
  "Solapur",
  "Dhule",
  "Amaravati",
  "Malegaon",
  "Kolhapur",
  "Nanded-Waghela",
  "Sangli",
  "Bhiwandi-Nizampur",
  "Thane",
  "Akola",
  "Latur",
  "Jalgaon",
  "Ahmednagar",
  "Miraj",
  "Chandrapur",
  "Parbhani",
  "Jalna",
  "Bhusawal",
  "Navi Mumbai",
  "Panvel",
  "Satara",
  "Beed",
  "Yavatmal",
  "Kamptee",
  "Gondia",
  "Barshi",
  "Achalpur",
  "Osmanabad",
  "Nandurbar",
  "Wardha",
  "Udgir",
  "Hinganghat",
];

const { useState, useEffect } = React;

const endpoint = "http://localhost:3000/property?";

const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [url, setUrl] = useState("http://localhost:3000/property");
  const [queryParams, setQueryParams] = useState({});

  const handleChange = ({ target }) => {
    setQueryParams({ ...queryParams, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allInputFieldsEmpty =
      !queryParams.location &&
      !queryParams.minPrice &&
      !queryParams.maxPrice &&
      !queryParams.distance &&
      !queryParams.purpose;
    if (allInputFieldsEmpty) {
      return;
    } else {
      let href = endpoint;

      if (queryParams.purpose) {
        href = `${href}&purpose=${queryParams.purpose}`;
      }

      if (queryParams.location) {
        href = `${href}&location=${queryParams.location}`;
      }

      if (queryParams.distance) {
        href = `${href}&distance=${queryParams.distance}`;
        console.log(href);
      }

      if (queryParams.minPrice) {
        href = `${href}&minPrice=${queryParams.minPrice}`;
      }

      if (queryParams.maxPrice) {
        href = `${href}&maxPrice=${queryParams.maxPrice}`;
      }

      console.log(href);
      setUrl(href);
    }
  };

  const getData = (givenUrl) => {
    setLoading(true);
    fetch(givenUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((responseJson) => {
        setProperties(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    getData(url);
    return;
  }, [url]);

  return (
    <div>
      <div className="my-5 jumbotron">
        <form onSubmit={handleSubmit} className="form-inline">
          <div className="form-group m-1">
            <select
              className="btn-sm form-control-plaintext"
              id="inputGroupSelect01"
              onChange={handleChange}
              name="purpose"
            >
              <option defaultValue>I want to</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
          <div className="form-group m-1">
            <input
              type="number"
              className="btn-sm form-control-plaintext"
              onChange={handleChange}
              value={queryParams.minPrice}
              name="minPrice"
              placeholder="Min Price"
            />
          </div>
          <div className="form-group m-1">
            <input
              type="number"
              className="btn-sm form-control-plaintext"
              onChange={handleChange}
              value={queryParams.maxPrice}
              name="maxPrice"
              placeholder="Max Price"
            />
          </div>
          <div className="form-group m-1">
            <select
              className="btn-sm form-control-plaintext"
              id="inputGroupSelect01"
              onChange={handleChange}
              name="location"
            >
              <option defaultValue>Location</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group m-1">
            <input
              type="number"
              className="btn-sm form-control-plaintext"
              onChange={handleChange}
              value={queryParams.distance}
              name="distance"
              placeholder="+0 km"
              step="5"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-primary mb-2">
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <img width="100px" src="../assets/loading.gif" />
        </div>
      )}

      <div className="row pb-5 mb-4">
        {properties &&
          properties.map((property) => {
            return (
              <div
                key={property._id}
                className="col-lg-3 col-md-4 mb-4 mb-lg-0"
              >
                <div className="card rounded shadow border-0 mb-2">
                  <div className="card-body p-3">
                    <img
                      src={property.images[0].url}
                      alt=""
                      className="img-fluid d-block mx-auto mb-3"
                    />
                    <h5>{property.title}</h5>
                    <p className="font-italic">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {property.location}
                    </p>
                    <p className="font-italic">
                      <span className="text-muted">Build up Area : </span>
                      {property.area}
                    </p>
                    {property.bedroom && (
                      <p className="font-italic">
                        <span className="text-muted">Bedroom : </span>
                        {property.bedroom} BHK
                      </p>
                    )}
                    <p className="font-italic">
                      <span className="text-muted">Property Type : </span>
                      {property.propertyType}
                    </p>
                    <ul className="list-inline small">
                      <li className="list-inline-item">
                        <h6>
                          <i class="fas fa-rupee-sign"></i> {property.price}{" "}
                          Lakhs
                        </h6>
                      </li>
                      <li className="list-inline-item float-right">
                        <a
                          className="btn btn-primary btn-sm"
                          href={`./showPage.html?id=${property._id}`}
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

ReactDOM.render(<PropertySearch />, document.getElementById("react-container"));
