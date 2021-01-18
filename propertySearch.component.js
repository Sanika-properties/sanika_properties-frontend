var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


var endpoint = 'http://localhost:3000/property?';

var PropertySearch = function PropertySearch() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        properties = _useState2[0],
        setProperties = _useState2[1];

    var _useState3 = useState(true),
        _useState4 = _slicedToArray(_useState3, 2),
        loading = _useState4[0],
        setLoading = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        error = _useState6[0],
        setError = _useState6[1];

    var _useState7 = useState('http://localhost:3000/property'),
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
                href = href + '&purpose=' + queryParams.purpose;
            }

            if (queryParams.location) {
                href = href + '&location=' + queryParams.location;
            }

            if (queryParams.distance) {
                href = href + '&distance=' + queryParams.distance;
                console.log(href);
            }

            if (queryParams.minPrice) {
                href = href + '&minPrice=' + queryParams.minPrice;
            }

            if (queryParams.maxPrice) {
                href = href + '&maxPrice=' + queryParams.maxPrice;
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
                throw new Error('Something went wrong');
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
        'div',
        null,
        React.createElement(
            'div',
            { className: 'my-5 jumbotron' },
            React.createElement(
                'form',
                { onSubmit: handleSubmit, className: 'form-inline' },
                React.createElement(
                    'div',
                    { className: 'form-group m-1' },
                    React.createElement(
                        'select',
                        { className: 'btn-sm form-control-plaintext',
                            id: 'inputGroupSelect01',
                            onChange: handleChange,
                            name: 'purpose'
                        },
                        React.createElement(
                            'option',
                            { selected: true },
                            'I want to'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Buy' },
                            'Buy'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Sell' },
                            'Sell'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group m-1' },
                    React.createElement('input', { type: 'number', className: 'btn-sm form-control-plaintext',
                        onChange: handleChange,
                        value: queryParams.minPrice,
                        name: 'minPrice',
                        placeholder: 'Min Price'
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group m-1' },
                    React.createElement('input', { type: 'number', className: 'btn-sm form-control-plaintext',
                        onChange: handleChange,
                        value: queryParams.maxPrice,
                        name: 'maxPrice',
                        placeholder: 'Max Price'
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group m-1' },
                    React.createElement('input', { type: 'text', className: 'btn-sm form-control-plaintext',
                        onChange: handleChange,
                        value: queryParams.location,
                        name: 'location',
                        placeholder: 'location'
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group m-1' },
                    React.createElement('input', { type: 'number', className: 'btn-sm form-control-plaintext',
                        onChange: handleChange,
                        value: queryParams.distance,
                        name: 'distance',
                        placeholder: '+0 km',
                        step: '5'
                    })
                ),
                React.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-sm btn-outline-warning mb-2' },
                    'Search'
                )
            )
        ),
        loading && React.createElement(
            'div',
            { className: 'd-flex justify-content-center' },
            React.createElement('img', { width: '100px', src: '../assets/loading.gif' })
        ),
        properties && properties.map(function (property) {
            return React.createElement(
                'div',
                { className: 'card mb-3', key: property._id },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement('img', { className: 'img-fluid', alt: '',
                            src: property.images[0].url })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-8' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'h5',
                                { className: 'card-title' },
                                property.title
                            ),
                            React.createElement(
                                'p',
                                { className: 'card-text' },
                                property.description
                            ),
                            React.createElement(
                                'p',
                                { className: 'card-text' },
                                React.createElement(
                                    'small',
                                    { className: 'text-muted' },
                                    property.location
                                )
                            ),
                            React.createElement(
                                'a',
                                { className: 'btn btn-sm btn-primary', href: '/>' },
                                'View'
                            )
                        )
                    )
                )
            );
        })
    );
};

ReactDOM.render(React.createElement(PropertySearch, null), document.getElementById('react-container'));