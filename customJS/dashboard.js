const baseUrl = 'http://localhost:3000'
const logOutBtn = document.getElementById('logOut-btn');
const propertySection = document.getElementById('property-list');
const token = localStorage.getItem('token');


const getProperties = () => {
    return fetch(`${baseUrl}/property`, {
        headers: { 'authorization': `Bearer ${token}` }
    })
        .then(res => res.json());
}



function showProperty(properties) {
    properties.map((property) => {
        const image = property.images.map(img => img.url);
        const propertyDiv = document.createElement('div');
        propertySection.appendChild(propertyDiv);
        propertyDiv.outerHTML = `
        <tr>
            <td>
                ${property.title}
            </td>
            <td>
            ${property.description}
            </td>
            <td>
                <img src='${image}' width="100px"/>
            </td>
            <td class="text-right">
                <button class="btn btn-outline btn-sm"><a>Edit</a></button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
        `;
    });
}

getProperties()
    .then(showProperty)
    .catch((err) => {
        console.log(err);
        window.location.replace('../login.html')
    });


document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'delete-btn') {
        alert('Are you sure you want to delete the property ?');

    }
});


const logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('../login.html');
}
logOutBtn.addEventListener('click', logOut)




