import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    renderAlert() {
        if (this.props.errorMessage) {
            return(
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    handleFormSubmit({ email, password }) {        
        this.props.signupUser({ email, password });
    }

    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input {...email} className="form-control" />
                    {email.touched && 
                     email.error && 
                     <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input {...password} type="password" className="form-control" />
                    {password.touched && 
                     password.error && 
                     <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Comfirm Password:</label>
                    <input {...passwordConfirm} type="password" className="form-control" />
                    {passwordConfirm.touched && 
                     passwordConfirm.error && 
                     <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    for(let field in formProps) {
        if(!formProps[field]){
            errors[field] = `Please fill the ${field}`
        }
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);