import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import { createPost } from '../actions/index';

class PostsNew extends React.Component {

  renderField (field) {
    const { meta: { touched, error } } = field;

    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // this.props comes from reduxForm
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}/>
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}/>
        <Field
          label="Post"
          name="content"
          component={this.renderField}/>
        <button type="submit" className="btn btn-primary">submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

}

function validate (values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter title';
  }
  if(!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter content';
  }

  // If errors is empty reduxForm assumes there are no errors
  return errors;
}

export default reduxForm({
  validate,
  form: 'postNewForm' // this form property has to be unique
})(
  connect(null, { createPost } )(PostsNew)
);
