let postsArray = []
let form = document.getElementById("new-blog-form")

function renderPosts() {
    let newHtml = ""
    for (let post of postsArray) {
        newHtml += `<h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
                `
    }
    document.getElementById("blog-list").innerHTML = newHtml
}
//Fetching initial posts from database
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })
    //Hooking up Post button
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        let postTitle = document.getElementById("post-title").value
        let postBody = document.getElementById("post-body").value
        const newBlogPost = {
            title: postTitle,
            body: postBody
        }
        // Post request and rerendering page with new post at top    
        const options = {
            method: "POST",
            body: JSON.stringify(newBlogPost),
            headers: {"Content-Type": "application/json"}
    }
         fetch("https://jsonplaceholder.typicode.com/posts", options)
            .then(res => res.json())
            .then(data => {
                postsArray.unshift(data)
                renderPosts()
                form.reset()
                })

            
    })
    
