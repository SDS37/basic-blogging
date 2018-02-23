import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
// actions
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends React.Component {

  // life cycle
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li
          key={post.id}
          className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">Add a post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }
// export default connect (mapStateToProps, mapDispatchToProps)(PostsIndex);

// promotes from class base component to container // export default PostsIndex;
// export default connect (null, { fetchPosts: fetchPosts })(PostsIndex);

export default connect (mapStateToProps, { fetchPosts })(PostsIndex);


