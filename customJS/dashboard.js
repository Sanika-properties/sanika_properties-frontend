const baseUrl = 'https://sanika-properties.herokuapp.com';
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
            ${property.location}
            </td>
            <td>
                <img src='${image}' width="100px"/>
            </td>
            <td class="text-right">
                <a class="btn btn-outline btn-sm" href='./edit.property.html?id=${property._id}'>Edit</a>
                <button class="btn btn-danger btn-sm" id="delete-btn-${property._id}">Delete</button>
            </td>
        </tr>
        `;
        const deleteButton = document.querySelector(`#delete-btn-${property._id}`);
        deleteButton.addEventListener('click', () => {
            deleteProperty(property._id)
                .then(() => {
                    showModal('Successfully deleted', 'success');
                    location.reload();
                })
        })
    });
}


function deleteProperty(id) {
    return fetch(`${baseUrl}/property/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        },
    });
}

getProperties()
    .then(showProperty)
    .catch((err) => {
        console.log(err);
        window.location.replace('../login.html')
    });




const logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('../login.html');
}
logOutBtn.addEventListener('click', logOut)




