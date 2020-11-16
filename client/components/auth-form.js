import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Button, Row, Col} from 'react-bootstrap'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Form onSubmit={handleSubmit} className="form-signup2">
      <Form.Row className="form-row">
        <Form.Group controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" placeholder="First Name" />
          <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" placeholder="Last name" />
          <Form.Control.Feedback>LooksGood!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className="form-row">
        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            aria-describedby="passwordHelpMsg"
          />
          <Form.Text id="passwordHelpMsg" muted>
            Must be 6-20 characters long.
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Button type="submit" variant="secondary" className="button">
        Submit
      </Button>
    </Form>
  )
  // return (
  //   <div className="signup-container">
  //     <form onSubmit={handleSubmit} name={name}>
  //       {displayName === 'Sign Up' && (
  //         <div>
  //           <div className="form-group">
  //             <label htmlFor="firstName">
  //               <small>First Name</small>
  //             </label>
  //             <input
  //               name="firstName"
  //               type="text"
  //               className="form-control"
  //               placeholder="Enter first name"
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="lastName">
  //               <small>Last Name</small>
  //             </label>
  //             <input
  //               name="lastName"
  //               type="text"
  //               className="form-control"
  //               placeholder="Enter last name"
  //             />
  //           </div>
  //         </div>
  //       )}
  //       <div className="form-group">
  //         <label htmlFor="email">
  //           <small>Email</small>
  //         </label>
  //         <input
  //           name="email"
  //           type="email"
  //           className="form-control"
  //           placeholder="Enter email"
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="password">
  //           <small>Password</small>
  //         </label>
  //         <input
  //           name="password"
  //           type="password"
  //           className="form-control"
  //           placeholder="Enter password"
  //         />
  //       </div>
  //       <div>
  //         <button type="submit">{displayName}</button>
  //       </div>
  //       {error && error.response && <div> {error.response.data} </div>}
  //     </form>
  //     <div className="google-signup">
  //       <a href="/auth/google">{displayName} with Google</a>
  //     </div>
  //   </div>
  // )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      const form = evt.currentTarget
      console.log(form)
      if (form.checkvalidity() === false) {
        evt.preventDefault()
        evt.stopPropagation()
      }

      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        console.log('dispatching')
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
