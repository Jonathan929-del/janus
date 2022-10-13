// Imports
import Nav from './Nav';
import Head from 'next/head'
import styled from 'styled-components';
import Sidebar from './Sidebar';


// Styles
const LayoutContainer = styled.div`
  width:100%;
  height:100%;
`
const SidebarChildrenWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`
const ChildreContainer = styled.div`
  margin-left:250px;
  width:calc(100vw - 250px);

  @media screen and (max-width:768px){
    margin-left:150px;
    width:calc(100vw - 150px);
  }
`


// Main Function
const Layout = ({children, page}) => {
  return (
    <LayoutContainer>
        <Head>
            <title>Janus</title>
            <meta name="description" content="Janus" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <SidebarChildrenWrapper>
          <Sidebar page={page}/>
          <ChildreContainer>
            {children}
          </ChildreContainer>
        </SidebarChildrenWrapper>
    </LayoutContainer>
  )
}


// Export
export default Layout;