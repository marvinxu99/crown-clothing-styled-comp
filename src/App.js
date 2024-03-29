import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ContactPage from './pages/contact/contact.component';
import CheckoutPage from './pages/checkout/checkout.component';
import PageNotFound from './pages/page-not-found/page-not-found.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser} from './redux/user/user.actions';
import { selectUserCurrentUser } from './redux/user/user.selectors';

import { ReactComponent as Logo } from './assets/images/winter-resized.svg';


class App extends React.Component {
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/contact' component={ContactPage} />
          <Route 
            exact path='/signin' 
            render={ () => currentUser ? 
              (<Redirect to='/' />) : (<SignInAndSignUpPage />) } 
          />
          <Route 
            path='/external' 
            component={() => window.location = 'https://external.com/path'}
          />     
          <Route component={PageNotFound} />    
        </Switch>
        <div className='winter-beautiful'>
          <Logo />
          <a href='http://www.google.ca' target='_blank' rel='noopener noreferrer'>
            Winter is beautiful. <br />
            Regular anchor tags work great.
          </a>
        </div>
      </div>
    );
  }
}

/**
const mapStateToProps = (state) => ({
  currentUser: selectUserCurrentUser(state)
}); **/
const mapStateToProps = createStructuredSelector({
  currentUser: selectUserCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
