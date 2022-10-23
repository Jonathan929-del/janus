// Imports
import Link from 'next/link';
import styled from 'styled-components';
import {VscJson} from 'react-icons/vsc';
import {BiArrowBack} from 'react-icons/bi';
import {CgFileDocument} from 'react-icons/cg';
import {RiFileListLine} from 'react-icons/ri';
import {AiOutlineUserSwitch} from 'react-icons/ai';
import {MdHomeWork, MdArrowForward} from 'react-icons/md';


// Styles
const SidebarContainer = styled.aside`
    left:0;
    top:70px;
    width:15%;
    z-index:3;
    width:250px;
    height:100vh;
    color:#fff;
    position:fixed;
    height:calc(100vh - 70px);
    background-color:#333F50;

    @media screen and (max-width:768px){
        width:150px;
    }
`
const SidebarWrapper = styled.div`
    width:100%;
    height:30%;
    display:flex;
    padding-top:50px;
    align-items:center;
    flex-direction:column;
    justify-content:space-between;
    border-top:1px solid #35c7FB;
`
const CreateButton = styled.button`
    height:40px;
    border:none;
    display:flex;
    color:#fff;
    padding:0 25px;
    cursor:pointer;
    border-radius:20px;
    align-items:center;
    justify-content:center;
    transition:0.1s linear;
    background-color:#ED7E31;

    &:hover{
        background-color:#e69154;
    }

    @media screen and (max-width:768px){
        font-size:10px;
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
    height:90%;
    margin-top:30px;
`
const ListItem = styled.p`
    width:100%;
    height:50px;
    display:flex;
    color:#fff;
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
    height:100%;
    display:flex;
    align-items:center;


    @media screen and (max-width:768px){
        width:80%;
    }
`
const ListIconContainer = styled.div`
    height:100%;
    display:flex;
    color:#fff;
    font-size:25px;
    align-items:center;

    @media screen and (max-width:768px){
        font-size:20px;
    }
`
const ListText = styled.a`
    height:100%;
    display:flex;
    margin-left:10px;
    align-items:center;

    @media screen and (max-width:768px){
        font-size:13px;
        margin-left:5px;
    }
`
const ArrowContainer = styled.div`
    height:100%;
    display:flex;
    font-size:20px;
    align-items:center;

    @media screen and (max-width:768px){
        font-size:15px;
    }
`
const PropertiesText = styled.p`
    height:30px;
    width:100px;
    margin-left:10px;
    border-bottom:3px solid #35c7FB;

    @media screen and (max-width:768px){
        height:25px;
        font-size:13px;
    }
`
const AnchorLink = styled.a`
    width:100%;
    height:50px;
    color:#fff;
    display:flex;
    margin-top:20px;
    align-items:center;
    text-decoration:none;

    &:hover{
        text-decoration:underline;
    }

    @media screen and (max-width:768px){
        font-size:13px;
    }
`
const ArrowBackIconContainer = styled.div`
    height:50px;
    display:flex;
    margin-right:5px;
    align-items:center;
    justify-content:center;
`
const HomeIconContainer = styled.div`
    height:50px;
    display:flex;
    font-size:30px;
    margin-right:15px;
    align-items:center;
    justify-content:center;

    @media screen and (max-width:768px){
        font-size:20px;
        margin-right:10px;
    }
`


// Main Function
const Sidebar = ({page}) => {
  return (
    <SidebarContainer>
        <SidebarWrapper>
            <CreateButton>
                <PlusContainer>+</PlusContainer>
                <CreateButtonText>Create New</CreateButtonText>
            </CreateButton>
            {page === 'home' &&
                <ListContainer>
                    <Link href='/properties' passHref>
                        <ListItem>
                            <ListLeftSection>
                                <ListIconContainer><MdHomeWork style={{height:'100%'}}/></ListIconContainer>
                                <ListText>Properties</ListText>
                            </ListLeftSection>
                            <ArrowContainer><MdArrowForward style={{height:'100%'}}/></ArrowContainer>
                        </ListItem>
                    </Link>
                    <Link href='/' passHref>
                        <ListItem>
                            <ListLeftSection>
                                <ListIconContainer><RiFileListLine style={{height:'100%'}}/></ListIconContainer>
                                <ListText>Planning</ListText>
                            </ListLeftSection>
                            <ArrowContainer><MdArrowForward style={{height:'100%'}}/></ArrowContainer>
                        </ListItem>
                    </Link>
                    <Link href='/' passHref>
                        <ListItem>
                            <ListLeftSection>
                                <ListIconContainer><CgFileDocument style={{height:'100%'}}/></ListIconContainer>
                                <ListText>Work order</ListText>
                            </ListLeftSection>
                            <ArrowContainer><MdArrowForward style={{height:'100%'}}/></ArrowContainer>
                        </ListItem>
                    </Link>
                    <Link href='/' passHref>
                        <ListItem>
                            <ListLeftSection>
                                <ListIconContainer><AiOutlineUserSwitch style={{height:'100%'}}/></ListIconContainer>
                                <ListText>User accounts</ListText>
                            </ListLeftSection>
                        </ListItem>
                    </Link>
                    <Link href='/' passHref>
                        <ListItem>
                            <ListLeftSection>
                                <ListIconContainer><VscJson style={{height:'100%'}}/></ListIconContainer>
                                <ListText>Data settings</ListText>
                            </ListLeftSection>
                        </ListItem>
                    </Link>
                </ListContainer>
            }
            {page === 'properties' &&
                <ListContainer>
                    <PropertiesText>Properties</PropertiesText>
                    <Link href='/' passHref>
                        <AnchorLink>
                            <ArrowBackIconContainer><BiArrowBack style={{height:'30px'}}/></ArrowBackIconContainer>
                            Go Back
                        </AnchorLink>
                    </Link>
                    <Link href='/' passHref>
                        <AnchorLink>
                            <HomeIconContainer><MdHomeWork style={{height:'30px'}}/></HomeIconContainer>
                            Navigation
                        </AnchorLink>
                    </Link>
                </ListContainer>
            }
            {page === 'add-property' &&
                <ListContainer>
                    <PropertiesText>Properties</PropertiesText>
                    <Link href='/properties' passHref>
                        <AnchorLink>
                            <ArrowBackIconContainer><BiArrowBack style={{height:'30px'}}/></ArrowBackIconContainer>
                            Back To Properties
                        </AnchorLink>
                    </Link>
                </ListContainer>
            }
        </SidebarWrapper>
    </SidebarContainer>
  )
};


// Export
export default Sidebar;