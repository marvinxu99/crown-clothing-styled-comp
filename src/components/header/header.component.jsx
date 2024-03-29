import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import { ReactComponent as Logo } from '../../assets/crown.svg';
//import { ReactComponent as Logo } from '../../assets/images/winter-resized.svg';
import winter2 from '../../assets/images/winter-winter.jpeg';


import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectUserCurrentUser } from '../../redux/user/user.selectors';

//import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink, LogoImg } from './header.styles';


const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <LogoImg src= { winter2 } />
      <span>Winter is beautiful.</span>
    </LogoContainer>

    <OptionsContainer>
        <OptionLink to='/'>
          HOME
        </OptionLink>
        <OptionLink to='/shop'>
          SHOP
        </OptionLink>
        <OptionLink to='/contact'>
          CONTACT
        </OptionLink>       
        { /* Logic for displaying SIGN OUT or SIGN IN */
          currentUser ?
          <OptionDiv onClick={()=>auth.signOut()}>
            SIGN OUT
          </OptionDiv>
          :  
          <OptionLink to='/signin'>
              SIGN IN
          </OptionLink>
        }
        <CartIcon />
      </OptionsContainer>
      { 
        hidden ? null : <CartDropdown />
      }
    </HeaderContainer>
);

/****
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
}) *****/
/*
const mapStateToProps = (state) => ({
  currentUser: selectUserCurrentUser(state),
  hidden: selectCartHidden(state)
}); */
const mapStateToProps = createStructuredSelector({
  currentUser: selectUserCurrentUser,
  hidden: selectCartHidden
}); 

export default connect(mapStateToProps)(Header);