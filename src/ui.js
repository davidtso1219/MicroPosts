export default class UI {

    static UISelector = {
        cardForm: '.card-form',
        posts: '#posts',
        postTitle: '#post-title',
        postBody: '#post-body',
        postSubmit: '.post-submit-btn',
        alert: '.alert',
    }

    constructor() {
        this.cardForm = document.querySelector(UI.UISelector.cardForm);
        this.posts = document.querySelector(UI.UISelector.posts);
        this.postTitle = document.querySelector(UI.UISelector.postTitle);
        this.postBody = document.querySelector(UI.UISelector.postBody);
        this.postSubmitBtn = document.querySelector(UI.UISelector.postSubmit);
    }

    changeState(newState) {
        if (newState === 'add') {
            this.postSubmitBtn.classList.remove('btn-warning');
            this.postSubmitBtn.classList.add('btn-primary');
            this.cancelBtn.remove();
        }
        else if (newState === 'edit') {
            this.postSubmitBtn.classList.remove('btn-primary');
            this.postSubmitBtn.classList.add('btn-warning');

            this.cancelBtn = document.createElement('button');
            this.cancelBtn.type = 'button';
            this.cancelBtn.textContent = 'Cancel';
            this.cancelBtn.className = 'd-grid cancel-btn btn btn-secondary btn-block mt-2';

            this.cardForm.insertBefore(this.cancelBtn, this.cardForm.lastChild.nextSibling);
        }
    }

    showAlert(mes, className) {

        this.clearAlert();

        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(mes));

        this.cardForm.insertBefore(div, this.cardForm.firstChild);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const alert = document.querySelector(UI.UISelector.alert);
        if (alert) {
            alert.remove();
        }
    }

    clearForm() {
        this.cardForm.removeAttribute('data-id');
        this.postTitle.value = '';
        this.postBody.value = '';
    }

    fillForm({ title, body, id }) {
        this.postTitle.value = title;
        this.postBody.value = body;
        this.cardForm.setAttribute('data-id', id);
    }

    getFormData() {
        const title = this.postTitle.value;
        const body = this.postBody.value;

        if (title.trim() === '' || body.trim() === '') {
            return null;
        }

        return {
            title,
            body
        };
    }

    showPosts(posts) {
        let html = '';
        for (let post of posts) {
            html +=
            `
            <div class="card my-4" data-id="${post.id}">
                <div class="card-body p-4">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link ms-1">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `;
        }
        this.posts.innerHTML = html;
    }
}