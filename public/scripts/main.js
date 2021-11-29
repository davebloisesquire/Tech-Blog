// Logging out

const logOut = async(event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST'
    })
    if (response.ok) {
        console.log(response);
        document.location.replace('/');
    } else {
        console.log("Error in posting")
    }
}

document.querySelector('#logout-button').addEventListener('click', logOut);