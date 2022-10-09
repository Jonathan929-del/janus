// Imports
import Nav from './Nav';
import Head from 'next/head'
import styled from 'styled-components';
import Sidebar from './Sidebar';


// Styles
const LayoutContainer = styled.div`
    width:100%;
    height:100vh;
`


// Main Function
const Layout = () => {
  return (
    <LayoutContainer>
        <Head>
            <title>Janus</title>
            <meta name="description" content="Janus" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <Sidebar />
    </LayoutContainer>
  )
}


// Export
export default Layout;