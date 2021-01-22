var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cities = ["Greater Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangbad", "Solapur", "Dhule", "Amaravati", "Malegaon", "Kolhapur", "Nanded-Waghela", "Sangli", "Bhiwandi-Nizampur", "Thane", "Akola", "Latur", "Jalgaon", "Ahmednagar", "Miraj", "Chandrapur", "Parbhani", "Jalna", "Bhusawal", "Navi Mumbai", "Panvel", "Satara", "Beed", "Yavatmal", "Kamptee", "Gondia", "Barshi", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat"];

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


var endpoint = "http://localhost:3000/property?";

var PropertySearch = function PropertySearch() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      properties = _useState2[0],
      setProperties = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  var _useState7 = useState("http://localhost:3000/property"),
      _useState8 = _slicedToArray(_useState7, 2),
      url = _useState8[0],
      setUrl = _useState8[1];

  var _useState9 = useState({}),
      _useState10 = _slicedToArray(_useState9, 2),
      queryParams = _useState10[0],
      setQueryParams = _useState10[1];

  var handleChange = function handleChange(_ref) {
    var target = _ref.target;

    setQueryParams(Object.assign({}, queryParams, _defineProperty({}, target.name, target.value)));
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var allInputFieldsEmpty = !queryParams.location && !queryParams.minPrice && !queryParams.maxPrice && !queryParams.distance && !queryParams.purpose;
    if (allInputFieldsEmpty) {
      return;
    } else {
      var href = endpoint;

      if (queryParams.purpose) {
        href = href + "&purpose=" + queryParams.purpose;
      }

      if (queryParams.location) {
        href = href + "&location=" + queryParams.location;
      }

      if (queryParams.distance) {
        href = href + "&distance=" + queryParams.distance;
        console.log(href);
      }

      if (queryParams.minPrice) {
        href = href + "&minPrice=" + queryParams.minPrice;
      }

      if (queryParams.maxPrice) {
        href = href + "&maxPrice=" + queryParams.maxPrice;
      }

      console.log(href);
      setUrl(href);
    }
  };

  var getData = function getData(givenUrl) {
    setLoading(true);
    fetch(givenUrl).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    }).then(function (responseJson) {
      setProperties(responseJson);
      setLoading(false);
    }).catch(function (error) {
      console.log(error);
      setError(error);
    });
  };

  useEffect(function () {
    getData(url);
    return;
  }, [url]);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "my-5 jumbotron" },
      React.createElement(
        "form",
        { onSubmit: handleSubmit, className: "form-inline" },
        React.createElement(
          "div",
          { className: "form-group m-1" },
          React.createElement(
            "select",
            {
              className: "btn-sm form-control-plaintext",
              id: "inputGroupSelect01",
              onChange: handleChange,
              name: "purpose"
            },
            React.createElement(
              "option",
              { defaultValue: true },
              "I want to"
            ),
            React.createElement(
              "option",
              { value: "Buy" },
              "Buy"
            ),
            React.createElement(
              "option",
              { value: "Sell" },
              "Sell"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "form-group m-1" },
          React.createElement("input", {
            type: "number",
            className: "btn-sm form-control-plaintext",
            onChange: handleChange,
            value: queryParams.minPrice,
            name: "minPrice",
            placeholder: "Min Price"
          })
        ),
        React.createElement(
          "div",
          { className: "form-group m-1" },
          React.createElement("input", {
            type: "number",
            className: "btn-sm form-control-plaintext",
            onChange: handleChange,
            value: queryParams.maxPrice,
            name: "maxPrice",
            placeholder: "Max Price"
          })
        ),
        React.createElement(
          "div",
          { className: "form-group m-1" },
          React.createElement(
            "select",
            {
              className: "btn-sm form-control-plaintext",
              id: "inputGroupSelect01",
              onChange: handleChange,
              name: "location"
            },
            React.createElement(
              "option",
              { defaultValue: true },
              "Location"
            ),
            cities.map(function (city, index) {
              return React.createElement(
                "option",
                { key: index, value: city },
                city
              );
            })
          )
        ),
        React.createElement(
          "div",
          { className: "form-group m-1" },
          React.createElement("input", {
            type: "number",
            className: "btn-sm form-control-plaintext",
            onChange: handleChange,
            value: queryParams.distance,
            name: "distance",
            placeholder: "+0 km",
            step: "5"
          })
        ),
        React.createElement(
          "button",
          { type: "submit", className: "btn btn-sm btn-primary mb-2" },
          "Search"
        )
      )
    ),
    loading && React.createElement(
      "div",
      { className: "d-flex justify-content-center" },
      React.createElement("img", { width: "100px", src: "../assets/loading.gif" })
    ),
    React.createElement(
      "div",
      { className: "row pb-5 mb-4" },
      properties && properties.map(function (property) {
        return React.createElement(
          "div",
          {
            key: property._id,
            className: "col-lg-3 col-md-4 mb-4 mb-lg-0"
          },
          React.createElement(
            "div",
            { className: "card rounded shadow border-0 mb-2" },
            React.createElement(
              "div",
              { className: "card-body p-3" },
              React.createElement("img", {
                src: property.images[0].url,
                alt: "",
                className: "img-fluid d-block mx-auto mb-3"
              }),
              React.createElement(
                "h5",
                null,
                property.title
              ),
              React.createElement(
                "p",
                { className: "font-italic" },
                React.createElement("i", { className: "fas fa-map-marker-alt" }),
                " ",
                property.location
              ),
              React.createElement(
                "p",
                { className: "font-italic" },
                React.createElement(
                  "span",
                  { className: "text-muted" },
                  "Build up Area : "
                ),
                property.area
              ),
              property.bedroom && React.createElement(
                "p",
                { className: "font-italic" },
                React.createElement(
                  "span",
                  { className: "text-muted" },
                  "Bedroom : "
                ),
                property.bedroom,
                " BHK"
              ),
              React.createElement(
                "p",
                { className: "font-italic" },
                React.createElement(
                  "span",
                  { className: "text-muted" },
                  "Property Type : "
                ),
                property.propertyType
              ),
              React.createElement(
                "ul",
                { className: "list-inline small" },
                React.createElement(
                  "li",
                  { className: "list-inline-item" },
                  React.createElement(
                    "h6",
                    null,
                    React.createElement("i", { "class": "fas fa-rupee-sign" }),
                    " ",
                    property.price,
                    " ",
                    "Lakhs"
                  )
                ),
                React.createElement(
                  "li",
                  { className: "list-inline-item float-right" },
                  React.createElement(
                    "a",
                    {
                      className: "btn btn-primary btn-sm",
                      href: "./showPage.html?id=" + property._id
                    },
                    "View More"
                  )
                )
              )
            )
          )
        );
      })
    )
  );
};

ReactDOM.render(React.createElement(PropertySearch, null), document.getElementById("react-container"));