const { useState, useEffect } = React;


const endpoint = 'http://localhost:3000/property?';



const PropertySearch  = () => {    
        const [ properties, setProperties] = useState([]);
        const [ loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        

        const [url, setUrl] = useState('http://localhost:3000/property');
        const [queryParams, setQueryParams] = useState({});
      
        const handleChange = ({ target }) => {
          setQueryParams({ ...queryParams, [target.name]: target.value });
        };
      
        const handleSubmit = (e) => {
            e.preventDefault();
            const allInputFieldsEmpty = !queryParams.location && !queryParams.minPrice && !queryParams.maxPrice && !queryParams.distance && !queryParams.purpose;
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

        const getData =  (givenUrl) => {
            setLoading(true);
            fetch(givenUrl).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                setProperties(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
            });
        } 
    
        useEffect(() => {
            getData(url);
            return 
        }, [url]);



  
    

    return (
        <div>
            <div className="my-5 jumbotron">
                <form onSubmit={handleSubmit} className="form-inline">
                    <div className="form-group m-1">
                        <select className="btn-sm form-control-plaintext" 
                            id="inputGroupSelect01"
                            onChange={handleChange}
                            name='purpose'
                        >
                            <option selected>I want to</option>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                        </select>
                    </div>
                    <div className="form-group m-1">
                        <input type="number" className="btn-sm form-control-plaintext" 
                            onChange={handleChange} 
                            value={queryParams.minPrice} 
                            name="minPrice" 
                            placeholder="Min Price"
                        />
                    </div>
                    <div className="form-group m-1">
                        <input type="number" className="btn-sm form-control-plaintext" 
                            onChange={handleChange} 
                            value={queryParams.maxPrice}  
                            name="maxPrice"
                            placeholder="Max Price"
                        />
                    </div>
                    <div className="form-group m-1">
                        <input type="text" className="btn-sm form-control-plaintext" 
                            onChange={handleChange} 
                            value={queryParams.location} 
                            name="location" 
                            placeholder="location" 
                        />
                        
                    </div>
                    <div className="form-group m-1">
                        <input type="number" className="btn-sm form-control-plaintext" 
                            onChange={handleChange} 
                            value={queryParams.distance} 
                            name="distance" 
                            placeholder="+0 km"
                            step='5'
                        />
                        
                    </div>
                    <button type="submit" className="btn btn-sm btn-outline-warning mb-2">Search</button>
                </form>
            </div>


                    

                
                
            {loading && <div className="d-flex justify-content-center"><img  width="100px"  src ='../assets/loading.gif'/></div>}
            
            {properties && properties.map(property => {
                return (
                <div className="card mb-3" key={property._id}>
                    <div className="row">
                        <div className="col-md-4">
                            
                            <img className="img-fluid" alt=""
                                src={property.images[0].url}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{property.title}</h5>
                                <p className="card-text">{property.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">{property.location}</small>
                                </p>
                                <a className="btn btn-sm btn-primary" href="/>">View</a>
                            </div>
                        </div>
                    </div>
                 </div>
                  
                )
            })}
        </div>
    )
}


ReactDOM.render( 
    <PropertySearch/>, 
    document.getElementById('react-container') 
);