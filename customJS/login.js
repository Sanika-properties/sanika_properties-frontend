const baseUrl = 'http://localhost:3000'

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');




const login = (formData) => {
    return fetch(`${baseUrl}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
    );
}

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        localStorage.removeItem('token');
        const data = { email: email.value, password: password.value };
        const response = await login(data);
        const userData = await response.json();
        if (!userData.token && userData.dbUser.role !== 'admin') return console.log('invalid Credentials');
        localStorage.setItem('token', userData.token);
        this.location.replace('../admin/dashboard.html')
    } catch (error) {
        console.log(error)
    }

})











