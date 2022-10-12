// Imports
import '../styles/globals.css';
import {useEffect} from 'react';


// Main Function
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles && jssStyles.parentElement.removeChild(jssStyles);
  }, []);
  return <Component {...pageProps} />
}


// Export
export default MyApp