import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavItem, NavLink, Navbar as BootstrapNavbar} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

const cartStyle = {
  fontSize: '24px'
}

export class Navbar extends React.Component {
  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    return (
      <>
        <BootstrapNavbar variant="dark" bg="dark" id="flex">
          <BootstrapNavbar.Brand>
            <img src="logo.png" alt="ALL_CAPS" className="logo" />
          </BootstrapNavbar.Brand>
          <Nav>
            {isLoggedIn ? (
              <div>
                <Nav>
                  {/* The navbar will show these links after you log in */}
                  <NavItem>
                    <Link to="/home">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/allproducts">Products</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/" onClick={handleClick}>
                      Logout
                    </Link>
                  </NavItem>
                  <NavItem className="center">
                    <Link to="/cart">
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        style={cartStyle}
                      />
                      <span className="badge badge-warning" id="lblCartCount">
                        5
                      </span>
                    </Link>
                  </NavItem>
                </Nav>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Nav>
                  <NavItem>
                    <Link to="/home">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/allproducts">Products</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/login">Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/signup" onClick={handleClick}>
                      Sign Up
                    </Link>
                  </NavItem>
                  <NavItem className="center">
                    <Link to="/cart">
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        style={cartStyle}
                      />
                      <span className="badge badge-warning" id="lblCartCount">
                        {this.props.cart.cartItems.length}
                      </span>
                    </Link>
                  </NavItem>
                </Nav>
              </div>
            )}
          </Nav>
        </BootstrapNavbar>
      </>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (

// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCartItems: () => dispatch({type: 'GET_ITEMS'})
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
