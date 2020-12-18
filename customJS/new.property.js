const baseUrl = 'https://sanika-properties.herokuapp.com';
const token = localStorage.getItem('token');


const propertyTitle = document.getElementById('title');
const propertyLocation = document.getElementById('location');
const propertyDescription = document.getElementById('description');
const propertyImage = document.getElementById('image');








document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'create-btn') {
        e.preventDefault();
        const data = {
            title: propertyTitle.value,
            description: propertyDescription.value.trim(),
            location: propertyLocation.value,
        }

        const { title, description, location } = data;
        if (title && description && location && propertyImage.files.length) {

            const formData = new FormData();
            console.log(propertyImage.files);
            formData.append('image', propertyImage.files[0])
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('location', data.location)
            createProperty(formData);
        } else {
            showModal('All Fields are required', 'danger');
        }
    }
});


function createProperty(newProperty) {
    console.log(newProperty);
    fetch(`${baseUrl}/property/`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: newProperty
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            showModal('Property created', 'success');
        });



}