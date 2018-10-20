import React from "react";
import Moment from "moment";
import axiosInst from "../_helpers/axios-helper";

import { POST_ALL_POSTS, POST_CREATE, POST_DELETE, POST_UPDATE } from "../_helpers/api";

Moment.locale("am");

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editContent: {},
      title: "",
      text: "",
      posts: []
    };
  }

  componentWillMount() {
    this.onPostsLoad();
  }

  onPostsLoad() {
    axiosInst({
      method: "get",
      url: POST_ALL_POSTS
    })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  onCreatePost() {
    const { text, title } = this.state;

    if (text.length > 0 && title.length > 0) {
      axiosInst({
        method: "post",
        url: POST_CREATE,
        data: {
          title: this.state.title,
          text: this.state.text
        }
      })
        .then(() => {
          this.onPostsLoad();
        })
        .catch(err => console.log(err));
    } else {
      alert("Fields of  the form must be filled!");
    }
  }

  onDeletePost(id) {
    axiosInst({
      method: 'delete',
      url: POST_DELETE,
      data: {
        postId: id
      }
    })
    .then(() => {
      this.onPostsLoad()
    })
    .catch(err => console.log(err))
  }

  onEditPost(i) {
    document.querySelector('#editTitle').value = this.state.posts[i].title;
    document.querySelector('#editTextarea').value = this.state.posts[i].text;
    document.querySelector('#postEditModal').dataset.postid = this.state.posts[i].id;
  }

  onUpdatePost(id) {
    axiosInst({
      method: 'put',
      url: POST_UPDATE,
      data: {
        postId: document.getElementById('postEditModal').dataset.postid,
        postParams: {
          ...this.state.editContent
        }
      }
    })
    .then(post => {
      this.onPostsLoad();
      document.getElementById('editForm').reset();
      this.setState({
        editContent: {}
      })
    })
    .catch(err => console.log(err))
  }

  onFieldChange(event) {
    if(event.target.id === 'editTitle' || event.target.id === 'editTextarea') {

      this.setState({
        editContent: {
          ...this.state.editContent,
          [event.target.name]: event.target.value
        }
      })

    } else {

      this.setState({
        [event.target.name]: event.target.value
      });

    }
  }

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Post Title</th>
              <th scope="col">Content</th>
              <th scope="col">Author</th>
              <th scope="col">Created</th>
              <th scope='col'>Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => {
              return (
                <tr key={index} postid={post.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{post.title}</td>
                  <td>{post.text}</td>
                  <td>{post.author.firstName + " " + post.author.lastName}</td>
                  <td>{Moment(post.createdDate).format("LLL")}</td>
                  <td>
                    <button type="button"
                      className="btn btn-primary"
                      onClick={() => this.onEditPost(index)}
                      data-toggle="modal"
                      data-target="#postEditModal"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => this.onDeletePost(post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>


        {/* Modal for Edit*/}
        <div
          className="modal fade"
          id="postEditModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-postid=''
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit Post
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  id='editForm'
                  className="form-signin"
                >
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="editTitle"
                      className="form-control"
                      placeholder="Post Title"
                      required
                      autoFocus
                      name="title"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <label htmlFor="title">Post Title</label>
                  </div>

                  <div className="form-label-group">
                    <textarea
                      id="editTextarea"
                      className="form-control"
                      placeholder="Post Content"
                      required
                      name="text"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <label htmlFor="text">Post Content</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.onUpdatePost()}
                >
                  Save Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal*/}
        <div
          className="modal fade"
          id="postModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Post
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  className="form-signin"
                >
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      placeholder="Post Title"
                      required
                      autoFocus
                      name="title"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <label htmlFor="title">Post Title</label>
                  </div>

                  <div className="form-label-group">
                    <textarea
                      id="textarea"
                      className="form-control"
                      placeholder="Post Content"
                      required
                      name="text"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <label htmlFor="text">Post Content</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.onCreatePost()}
                >
                  Save Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#postModal"
        >
          Create New Post
        </button>
      </div>
    );
  }
}
