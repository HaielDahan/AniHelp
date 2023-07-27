import './App.css';
import Homepage from './HomePageComponents/homepage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Loginpage from './HomePageComponents/loginpage';
import Signup from './HomePageComponents/signup';
import Userportalpage from './UserPortalComps/userportal';
import Profilepage from './UserPortalComps/profilepage';
import Account from './UserPortalComps/account';
import About from './HomePageComponents/about';
import ItemDetails from './UserPortalComps/itemetails';


function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userportal" element={<Userportalpage />} />
          <Route path="/profile" element = {<Profilepage />}/>
          <Route path="/Myaccount" element = {<Account />}/>
          <Route path="/about" element = {<About />}/>
          <Route path="/item-details" element = {<ItemDetails />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

{/*link Modal in ReactJS - Code a React Modal Tutorial using Hooks  */}
{/*https://www.google.com/search?q=modal+overlay+react+hooks&rlz=1C1KNTJ_iwIL1033IL1033&sxsrf=AJOqlzWCsma98JFrQPEuW6ll51621elNHw%3A1678652794481&ei=ejUOZISLHc7AkgXkgJOYCA&oq=modal+overlay+react+h&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgUIIRCgATIFCCEQoAEyBQghEKABMggIIRAWEB4QHTIICCEQFhAeEB0yCAghEBYQHhAdMggIIRAWEB4QHTIICCEQFhAeEB0yCAghEBYQHhAdMggIIRAWEB4QHToKCAAQRxDWBBCwAzoHCAAQsAMQQzoICAAQgAQQywE6BggAEBYQHjoICAAQFhAeEA86CAgAEAgQHhANSgQIQRgAUOgQWPZGYM9RaARwAXgAgAGcAYgBvgiSAQMwLjiYAQCgAQHIAQnAAQE&sclient=gws-wiz-serp#fpstate=ive&vld=cid:c3afeac9,vid:ZCvemsUfwPQ*/}