const baseUrl = 'https://sanika-properties.herokuapp.com';
const token = localStorage.getItem('token');

const propertyId = window.location.search.split('=')[1];

const propertyTitle = document.getElementById('title');
const propertyLocation = document.getElementById('location');
const propertyDescription = document.getElementById('description');


const getProperty = () => {
    return fetch(`${baseUrl}/property/${propertyId}`)
        .then(res => res.json());
}


function showProperty(incomingResponse) {
    propertyTitle.setAttribute('value', incomingResponse.title)
    propertyLocation.setAttribute('value', incomingResponse.location)
    propertyDescription.append(incomingResponse.description)
}


getProperty()
    .then(showProperty)
    .catch((err) => {
        console.log(err);
        window.location.replace('../login.html')
    });


document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'edit-btn') {
        e.preventDefault();
        const data = {
            title: propertyTitle.value,
            description: propertyDescription.value.trim(),
            location: propertyLocation.value,
        }
        editProperty(data);
    }
});


function editProperty(editedProperty) {
    console.log(editedProperty);
    fetch(`${baseUrl}/property/${propertyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedProperty)
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            showModal('Property updated', 'success');
        });
}