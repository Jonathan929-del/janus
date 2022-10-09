// Imports
import styled from 'styled-components';
import {VscJson} from 'react-icons/vsc';
import {CgFileDocument} from 'react-icons/cg';
import {RiFileListLine} from 'react-icons/ri';
import {AiOutlineUserSwitch} from 'react-icons/ai';
import {MdHomeWork, MdArrowForward} from 'react-icons/md';


// Styles
const SidebarContainer = styled.aside`
    width:15%;
    height:calc(100% - 70px);
    background-color:#333F50;
`
const SidebarWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    padding-top:50px;
    align-items:center;
    flex-direction:column;
    border-top:1px solid #35c7FB;
`
const CreateButton = styled.button`
    border:none;
    display:flex;
    padding:0 20px;
    cursor:pointer;
    border-radius:20px;
    align-items:center;
    justify-content:center;
    transition:0.1s linear;
    background-color:#ED7E31;

    &:hover{
        background-color:#e69154;
    }
`
const PlusContainer = styled.p`
    height:100%;
    display:flex;
    font-size:20px;
    margin-right:5px;
    align-items:center;
    padding-bottom:3px;
    justify-content:center;
`
const CreateButtonText = styled.p`
    height:100%;
    display:flex;
    margin-right:5px;
    align-items:center;
    justify-content:center;
`
const ListContainer = styled.div`
    width:90%;
    margin-top:30px;
`
const ListItem = styled.a`
    width:100%;
    display:flex;
    cursor:pointer;
    margin-top:30px;
    align-items:center;
    text-decoration:none;
    justify-content:space-between;

    &:hover{
        text-decoration:underline;
    }
`
const ListLeftSection = styled.div`
    width:70%;
    display:flex;
    align-items:center;
`
const ListIconContainer = styled.div`
    display:flex;
    color:#fff;
    font-size:25px;
    align-items:center;
`
const ListText = styled.p`
    display:flex;
    margin-left:10px;
    align-items:center;
`
const ArrowContainer = styled.div`
    display:flex;
    font-size:20px;
    align-items:center;
`


// Main Function
const Sidebar = () => {
  return (
    <SidebarContainer>
        <SidebarWrapper>
            <CreateButton>
                <PlusContainer>+</PlusContainer>
                <CreateButtonText>Create New</CreateButtonText>
            </CreateButton>
            <ListContainer>
                <ListItem href='/'>
                    <ListLeftSection>
                        <ListIconContainer><MdHomeWork /></ListIconContainer>
                        <ListText>Properties</ListText>
                    </ListLeftSection>
                    <ArrowContainer><MdArrowForward /></ArrowContainer>
                </ListItem>
                <ListItem href='/'>
                    <ListLeftSection>
                        <ListIconContainer><RiFileListLine /></ListIconContainer>
                        <ListText>Planning</ListText>
                    </ListLeftSection>
                    <ArrowContainer><MdArrowForward /></ArrowContainer>
                </ListItem>
                <ListItem href='/'>
                    <ListLeftSection>
                        <ListIconContainer><CgFileDocument /></ListIconContainer>
                        <ListText>Work order</ListText>
                    </ListLeftSection>
                    <ArrowContainer><MdArrowForward /></ArrowContainer>
                </ListItem>
                <ListItem href='/'>
                    <ListLeftSection>
                        <ListIconContainer><AiOutlineUserSwitch /></ListIconContainer>
                        <ListText>User accounts</ListText>
                    </ListLeftSection>
                </ListItem>
                <ListItem href='/'>
                    <ListLeftSection>
                        <ListIconContainer><VscJson /></ListIconContainer>
                        <ListText>Data settings</ListText>
                    </ListLeftSection>
                </ListItem>
            </ListContainer>
        </SidebarWrapper>
    </SidebarContainer>
  )
};


// Export
export default Sidebar;