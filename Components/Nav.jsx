// Imports
import styled from 'styled-components';
import {IoLogOutOutline} from 'react-icons/io5';
import {AiOutlineSearch, AiOutlineBell} from 'react-icons/ai';


// Styles
const NavContainer = styled.nav`
    width:100%;
    height:70px;
    display:flex;
    background-color:#333F50;
`
const Void = styled.div`
    width:15%;
    height:100%;
`
const NavWrapper = styled.div`
    width:90%;
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const SearchIconContainer = styled.div`
    padding:5px;
    display:flex;
    font-size:30px;
    cursor:pointer;
    margin-left:30px;
    border-radius:50px;
    align-items:center;
    justify-content:center;
    border:1px solid #35c7FB;
`
const RightSection = styled.div`
    width:200px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const BellContainer = styled.div`
    font-size:30px;
    cursor:pointer;
`
const LogoutContainer = styled.div`
    font-size:30px;
    cursor:pointer;
    margin-right:50px;
`


// Main Function
const Nav = () => {
  return (
    <NavContainer>
        <Void />
        <NavWrapper>
            <SearchIconContainer>
                <AiOutlineSearch />
            </SearchIconContainer>
            <RightSection>
                <BellContainer>
                    <AiOutlineBell />
                </BellContainer>
                <LogoutContainer>
                    <IoLogOutOutline />
                </LogoutContainer>
            </RightSection>
        </NavWrapper>
    </NavContainer>
  )
}


// Export
export default Nav;