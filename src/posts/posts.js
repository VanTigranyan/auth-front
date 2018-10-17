import React from 'react';
import axiosInst from '../_helpers/axios-helper';

import { POST_OF_THE_USER } from '../_helpers/api'

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  componentWillMount() {

    axiosInst({
      method: 'get',
      url: POST_OF_THE_USER
    })
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => console.log(err))
  }


  render() {
    return(
      <div>
        {this.state.posts.map((post,index) => {
          return (
            <div className='card col-lg-4 mb-3' key={index}>
              <div className="post card-body">
                <ul>
                  <li><h3>{ post.heading }</h3></li>
                  <li><p>{ post.text }</p></li>
                  <li><span>Author: { post.username }</span></li>
                  <li><span>Created: { post.createdDate}</span></li>
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
