let card = post => {
    return `
    <div class="card z-depth-4">
                    <div class="card-content">
                        <span class="card-title">${post.title}</span>
                        <p>${post.text}</p>
                        <small>${post.date}</small>
                    </div>
                    <div class="card-action">
                        <button class="btn btn-small red js-remove" data-id="${post._id}">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>`
};

let posts = [];
let modal;
let BASE_URL = '/api/post';

class PostApi {
    static fetch(){
        return fetch(BASE_URL, {method: 'get'}).then(res => res.json())
    }

    static create(post){
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept': "application/json",
                "Content-type": "application/json"
            }
        }).then(res => res.json());
    }

    static remove(id){
        return fetch(`${BASE_URL}/${id}`,{
            method: 'delete'
        }).then(res => res.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
            renderPosts(posts)
    });
    modal = M.Modal.init(document.querySelector('.modal'));
    document.querySelector('#createPost').addEventListener('click', onCreatePost);
    document.querySelector('#posts').addEventListener('click', onDeletePost)
});

function renderPosts(_posts = []) {

    let $posts = document.querySelector('#posts');

    if (_posts.length > 0) {
        $posts.innerHTML = _posts.map(post => card(post)).join(' ')
    } else {
        $posts.innerHTML = `<div class="center">no posts</div>`
    }

}

function onCreatePost() {
    let $title = document.querySelector('#title');
    let $text = document.querySelector('#text');

    if ($title.value && $text.value) {
        let newPost = {
            title: $title.value,
            text: $text.value
        };
        PostApi.create(newPost).then(post => {
            posts.push(post);
            renderPosts(posts)
        });
        modal.close();
        $title.value = "";
        $text.value = "";
        M.updateTextFields()
    }


}

function onDeletePost(event) {
    if (event.target.classList.contains('js-remove')){
        let decision = confirm('delete?');

        if (decision){
            let id = event.target.getAttribute('data-id');

            PostApi.remove(id).then(() => {
                let postIndex = posts.findIndex(post => post._id === id );
                posts.splice(postIndex, 1);
                renderPosts(posts)
            })
        }
    }
}














