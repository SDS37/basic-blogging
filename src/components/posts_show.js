import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// actions
import { fetchPost, deletePost } from '../actions/index';

class PostShow extends React.Component {

  componentDidMount() {
    // const id = this.props.match.params.id;
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick () {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // const post = this.props.posts[this.props.match.params.id];
    const { post } = this.props;
    if(!post) {
      return <div>loading... </div>;
    }
    return (
      <div>
        <Link to="/" className="btn btn-primary">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

}

// function mapStateToProps( state ) {
//   const posts = state.posts
// }

function mapStateToProps( { posts }, ownProps ) {
  // return { posts };
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);