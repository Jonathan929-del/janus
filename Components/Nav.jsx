// Imports
import styled from 'styled-components';
import {IoLogOutOutline} from 'react-icons/io5';
import {AiOutlineSearch, AiOutlineBell} from 'react-icons/ai';


// Styles
const NavContainer = styled.nav`
    top:0;
    left:0;
    z-index:3;
    width:100%;
    height:70px;
    display:flex;
    color:#fff;
    position:sticky;
    max-height:70px;
    background-color:#333F50;
`
const Void = styled.div`
    width:15%;
    height:100%;
    min-width:250px;

    @media screen and (max-width:768px){
        min-width:150px;
    }
`
const NavWrapper = styled.div`
    width:90%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const SearchIconContainer = styled.div`
    padding:5px;
    display:flex;
    height:60%;
    font-size:30px;
    cursor:pointer;
    border-radius:50px;
    align-items:center;
    justify-content:center;
    border:1px solid #35c7FB;
`
const RightSection = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const BellContainer = styled.div`
    font-size:30px;
    cursor:pointer;
    margin-right:50px;

    @media screen and (max-width:768px){
        margin-right:20px;
    }
`
const LogoutContainer = styled.div`
    font-size:30px;
    cursor:pointer;
    margin-right:50px;

    @media screen and (max-width:768px){
        margin-right:20px;
    }
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