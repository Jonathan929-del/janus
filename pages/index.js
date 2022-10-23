// Imports
import Cookie from 'js-cookie';
import Layout from '../Components/Layout';


// Main Function
const Home = () => {

  Cookie.remove('component');

  return (
    <>
      <Layout page='home'/>
    </>
  )
}


// Export
export default Home;