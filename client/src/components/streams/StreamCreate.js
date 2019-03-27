import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from './../../actions';

class StreamCreate extends React.Component{
    renderError(meta){
        if(meta.touched && meta.error){
            return(
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }
    }

    renderInput = (formProps) => {
        const className =  `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input } autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
           
        );
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render(){
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Title"/>
                <Field name="description" component={this.renderInput} label="Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const error = {}
    if(!formValues.title){
        error.title = 'You must enter a title'
    }

    if(!formValues.description){
        error.description = 'You must enter description'
    }

    return error;
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, {createStream} )(formWrapped);