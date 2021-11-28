// SIGN UP NEW USER
const signup = async(event) => {
    event.preventDefault();

    const username = document.querySelector("#nameInput").value.trim();
    const email = document.querySelector("#emailInput").value.trim();
    const password = document.querySelector("#passwordInput").value.trim();



    if (username && email && password) {
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            alert("You are logged in")
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
}

document.querySelector('#signup-button').addEventListener('click', signup);