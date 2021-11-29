const updateArticle = async(event) => {
    event.preventDefault();

    const article_id = parseInt(document.querySelector("#contentInput").dataset.articleId)
    const title = document.querySelector("#titleInput").value.trim();
    const content = document.querySelector("#contentInput").value.trim();

    if (title && content && article_id) {
        const response = await fetch(`/api/article/${article_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log("Error in updating")
        }
    }
}

const deleteArticle = async(event) => {
    event.preventDefault();

    const article_id = parseInt(document.querySelector("#delete-article").dataset.articleId);
    const response = await fetch(`/api/article/${article_id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log("Error in deleting")
    }

}

document.querySelector('#update-article').addEventListener('click', updateArticle);
document.querySelector('#delete-article').addEventListener('click', deleteArticle);