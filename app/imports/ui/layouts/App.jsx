import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListItems from '../pages/ListItems';
import ListStuffAdmin from '../pages/ListItemsAdmin';
import ListProfileAdmin from '../pages/ListProfileAdmin';
import AddItem from '../pages/ItemPost';
import EditItem from '../pages/EditItem';
import EditProfile from '../pages/EditProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signout from '../pages/Signout';
import SuccessfulPosting from '../pages/SuccessfulPosting';
import Questionnaire1 from '../pages/Questionnaire1';
import Questionnaire from '../pages/Questionnaire';
import BargainsSignup from '../pages/BargainsSignup';
import MyProfile from '../pages/MyProfile';
import BargainsProfile from '../pages/BargainsProfile';
import Books from '../pages/Books';
import Computers from '../pages/Computers';
import Music from '../pages/Music';
import About from '../pages/About';
import ProductPage from '../pages/ProductPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={BargainsSignup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/successfulposting" component={SuccessfulPosting}/>
            <ProtectedRoute path="/shop" component={ListItems}/>
            <ProtectedRoute path="/books" component={Books}/>
            <ProtectedRoute path="/computers" component={Computers}/>
            <ProtectedRoute path="/music" component={Music}/>
            <ProtectedRoute path="/add" component={AddItem}/>
            <ProtectedRoute path="/edit/:_id" component={EditItem}/>
            <ProtectedRoute path="/editProfile/:_id" component={EditProfile}/>
            <ProtectedRoute path="/about" component={About}/>
            <ProtectedRoute path="/questionnaire" component={Questionnaire1}/>
            <ProtectedRoute path="/questionnaireform" component={Questionnaire}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <AdminProtectedRoute path="/profileadmin" component={ListProfileAdmin}/>
            <ProtectedRoute path="/myprofile" component={MyProfile}/>
            <ProtectedRoute path="/bprofile/:_id" component={BargainsProfile}/>
            <ProtectedRoute path="/productpage/:_id" component={ProductPage}/>
            <ProtectedRoute path="/modal" component={UserModal}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
