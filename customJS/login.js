const baseUrl = 'https://sanika-properties.herokuapp.com';

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');



const login = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    const data = { email: email.value, password: password.value };
    login(data).then(userData => {
        if (!userData.token) {
            return showModal(userData.message, 'danger');
        }
        if (userData.dbUser.role !== 'admin') {
            return showErrorModal(userData.message, 'danger');
        }
        localStorage.setItem('token', userData.token);
        window.location.href = './admin/dashboard.html';
    })
});
