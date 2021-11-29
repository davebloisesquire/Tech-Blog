// LOGIN EXISTING USER
const login = async(event) => {
    event.preventDefault();

    const email = document.querySelector("#emailInput").value.trim();
    const password = document.querySelector("#passwordInput").value.trim();

    if (email && password) {
        // Send the e-mail and password to the server
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Username or Password Invalid');
        }
    }
}

document.querySelector('#login-button').addEventListener('click', login);