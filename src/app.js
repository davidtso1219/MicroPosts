import EasyHTTP from "./http.js";
import UI from "./ui.js";

class App {

    static DB_URL = "http://localhost:3000/posts";

    constructor() {
        this.http = new EasyHTTP();
        this.ui = new UI();
        this.state = 'add';
    }

    init() {
        this.showPosts();
        this.loadEventListeners();
    }

    loadEventListeners() {
        this.ui.posts.addEventListener('click', (e) => this.deletePost(e));
        this.ui.posts.addEventListener('click', (e) => this.editPost(e));
        this.ui.postSubmitBtn.addEventListener('click', () => {
            if (this.state === 'add') {
                this.addPost();
            }
            else if (this.state === 'edit') {
                this.updatePost();
            }
        });
    }

    changeState(newState) {
        this.state = newState;
        this.ui.changeState(newState);
    }

    updatePost() {
        const id = this.ui.cardForm.getAttribute('data-id');
        const formData = this.ui.getFormData();

        if (formData === null) {
            this.ui.showAlert('Please Fill in Title and Body', 'alert alert-danger');
            return;
        }

        this.http.put(`${App.DB_URL}/${id}`, formData)
            .then(() => {
                this.changeState('add');
                this.ui.clearForm();
                this.showPosts();
            })
            .catch(console.error);
    }

    cancelEdit() {
        this.changeState('add');
        this.ui.clearForm();
    }

    editPost(e) {
        if (!e.target.parentElement.classList.contains('edit')) {
            return;
        }
        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        this.http.get(`${App.DB_URL}/${id}`)
            .then(data => {
                this.ui.fillForm(data);
                this.changeState('edit');
                this.ui.cancelBtn.addEventListener('click', () => this.cancelEdit());
            })
            .catch(console.error);
    }

    deletePost(e) {

        if (!e.target.parentElement.classList.contains('delete')) {
            return;
        }

        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        if (this.state === 'edit' && id === this.ui.cardForm.getAttribute('data-id')) {
            this.ui.showAlert("Can't delete a post being edited", 'alert alert-danger');
            return;
        }

        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }

        this.http.delete(`${App.DB_URL}/${id}`)
            .then((data) => {
                this.ui.showAlert('Post Removed!', 'alert alert-success');
                this.showPosts();
            })
            .catch(err => console.log(err));
    }

    addPost() {
        const formData = this.ui.getFormData();
        if (formData === null) {
            this.ui.showAlert('Please Fill in Title and Body', 'alert alert-danger');
            return;
        }
        this.http.post(App.DB_URL, formData)
            .then(() => {
                this.showPosts();
                this.ui.clearForm();
                this.ui.showAlert('Post Added!', 'alert alert-success');
            })
            .catch(err => console.log(err));
    }

    showPosts() {
        this.http.get(App.DB_URL)
            .then((posts) => { this.ui.showPosts(posts) })
            .catch()
    }
}

const app = new App();
app.init();