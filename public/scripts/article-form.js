const newArticle = async(event) => {
    event.preventDefault();

    const title = document.querySelector("#titleInput").value.trim();
    const content = document.querySelector("#contentInput").value.trim();

    if (title && content) {
        const response = await fetch('api/article', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            console.log(response);
        } else {
            console.log("Error in posting")
        }
    }
}

document.querySelector('#submit-article').addEventListener('click', newArticle);