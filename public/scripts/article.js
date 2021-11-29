// ADDING A NEW COMMENT

const addComment = async(event) => {
    event.preventDefault();
    const comment = document.querySelector("#commentInput").value.trim();
    const article_id = parseInt(document.querySelector("#commentInput").dataset.articleId);

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, article_id }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log("Error in posting")
        }
    }

}

document.querySelector('#submit-comment').addEventListener('click', addComment);