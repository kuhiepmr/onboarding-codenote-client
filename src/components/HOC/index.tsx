import { connect } from 'react-redux';
import { authenticate } from '../../actions/authenticate';
import { compose } from 'redux';

const mapAuthenticationStatus = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated,
});

const mapAuthenticationAction = dispatch => ({
  userHasAuthenticated: (isLogin) => dispatch(authenticate(isLogin)),
})

export const withAuthenticationStatus = Component => connect(mapAuthenticationStatus)(Component)

export const withAuthentication = Component => connect(mapAuthenticationStatus, mapAuthenticationAction)(Component)


