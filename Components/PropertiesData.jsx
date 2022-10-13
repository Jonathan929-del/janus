// Imports
import {useState} from 'react';
import styled from 'styled-components';
import {AiOutlineDown} from 'react-icons/ai';


// Styles
const MainContainer = styled.div`
    height:100%;
    display:flex;
    margin-left:20px;
    flex-direction:column;
`
const TopSection = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    padding:30px 20px 0 0;
    justify-content:space-between;
    border-bottom:1px solid #ccc;
`
const TopTopSection = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const PropertyName = styled.p`
    color:#5c5c5c;
`
const OptionsArea = styled.div`
    width:100%;
    height:50px;
    display:flex;
`
const SelectedItem = styled.div`
    width:25%;
    display:flex;
    cursor:pointer;
    min-width:100px;
    align-items:center;
    justify-content:center;
    border:1px solid #ccc;

    @media screen and (max-width:1100px){
        font-size:13px;
    }
`
const Item = styled.div`
    width:25%;
    display:flex;
    color:#fff;
    cursor:pointer;
    align-items:center;
    justify-content:center;
    border:1px solid #ccc;
    background-color:#333F50;

    @media screen and (max-width:1100px){
        font-size:13px;
    }
`
const TopBottomSection = styled.div`
    width:100%;
    display:flex;
    max-width:800px;
    margin-top:30px;
    align-items:flex-start;
    justify-content:flex-start;
`
const ActionsButtonContainer = styled.div`
    position:relative;
`
const ActionsButton = styled.div`
    width:150px;
    display:flex;
    padding:10px;
    cursor:pointer;
    border-radius:10px;
    align-items:center;
    justify-content:center;
    background-color:#fff;
    border:2px solid #ED7E31;

    @media screen and (max-width:1100px){
        width:100px;
        padding:5px;   
    }
`
const ActionsButtonText = styled.p`
    display:flex;
    color:#ED7E31;
    font-size:15px;
    font-weight:500;
    align-items:center;
    justify-content:center;

    @media screen and (max-width:1100px){
        font-size:13px;
    }
`
const ActionsButtonIconContainer = styled.div`
    display:flex;
    font-size:15px;
    color:#ED7E31;
    font-weight:500;
    margin:3px 0 0 5px;
    align-items:center;
    justify-content:center;
`
const ButtonContent = styled.div`
    left:0;
    top:42px;
    width:100%;
    position:absolute;
    background-color:#ccc;
    border-radius:0 0 5px 5px;
    display:${({isActionsOpened}) => isActionsOpened ? 'block' : 'none'};

    @media screen and (max-width:1100px){
        top:30px;
    }
`
const Action = styled.div`
    cursor:pointer;
    padding:10px 5px;
    border-bottom:1px solid #000;

    @media screen and (max-width:1100px){
        font-size:13px;
        padding:7px 5px;
    }
`
const LastAction = styled.div`
    padding:5px;
    cursor:pointer;

    @media screen and (max-width:1100px){
        font-size:13px;
        padding:7px 5px;
    }
`
const BottomSection = styled.div`
    gap:20px;
    height:100%;
    display:grid;
    padding-top:50px;
    margin:0 20px 40px 0;
    grid-template-rows:repeat(5, 1fr);
    grid-template-columns:repeat(4, 1fr);
    grid-template-areas:'propertyCode address longitude buildings'
                        'legalName zipCode latitude buildings'
                        'name city geoFence buildings'
                        'operationsArea responsibleUser . .'
                        'administrativeArea area owner .';

    @media screen and (max-width:992px){
        gap:10px;
    }

    @media screen and (max-width:992px){
        grid-template-rows:repeat(9, 1fr);
        grid-template-columns:repeat(3, 1fr);
        grid-template-areas:'propertyCode address buildings'
                            'longitude legalName buildings'
                            'zipCode latitude buildings'
                            'name city buildings'
                            'geoFence operationsArea .'
                            'responsibleUser administrativeArea .'
                            'area owner .';
        gap:10px;
        height:500px;
    }
`
const Label = styled.p`
    font-size:15px;
    margin-bottom:10px;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const Value = styled.p`
    padding:10px;
    font-size:14px;
    border-radius:5px;
    background-color:#c3c3c3;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const PropertyCode = styled.div`
    grid-area:propertyCode;
`
const Address = styled.div`
    grid-area:address;
`
const Longitude = styled.div`
    grid-area:longitude;
`
const LegalName = styled.div`
    grid-area:legalName;   
`
const ZipCode = styled.div`
    grid-area:zipCode;
`
const Latitude = styled.div`
    grid-area:latitude;
`
const Name = styled.div`
    grid-area:name;
`
const City = styled.div`
    grid-area:city;
`
const GeoFence = styled.div`
    grid-area:geoFence;
`
const OperationsArea = styled.div`
    grid-area:operationsArea;
`
const ResponsibleUser = styled.div`
    grid-area:responsibleUser;
`
const AdministrativeArea = styled.div`
    grid-area:administrativeArea;
`
const Area = styled.div`
    grid-area:area;
`
const Owner = styled.div`
    grid-area:owner;
`
const Buildings = styled.div`
    grid-area:buildings;
`
const BuildingValue = styled.div`
    height:100%;
    padding:10px;
    border-radius:5px;
    background-color:#c3c3c3;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`


// Main Function
const PropertiesData = () => {

    const [isActionsOpened, setIsActionsOpened] = useState(false);
    const actionsToggler = () => {
        setIsActionsOpened(!isActionsOpened);
    };

    return (
        <MainContainer>
            <TopSection>
                <TopTopSection>
                    <PropertyName>1003 BYGGMÄSTAREN</PropertyName>
                    <ActionsButtonContainer>
                        <ActionsButton onClick={actionsToggler}>
                            <ActionsButtonText>Actions</ActionsButtonText>
                            <ActionsButtonIconContainer>
                                <AiOutlineDown />
                            </ActionsButtonIconContainer>
                        </ActionsButton>
                        <ButtonContent isActionsOpened={isActionsOpened}>
                            <Action>Add New</Action>
                            <Action>Modify</Action>
                            <LastAction>Delete</LastAction>
                        </ButtonContent>
                    </ActionsButtonContainer>
                </TopTopSection>
                <TopBottomSection>
                    <OptionsArea>
                        <SelectedItem>Main Data</SelectedItem>
                        <Item>Attributes</Item>
                        <Item>Data 2</Item>
                        <Item>Data 3</Item>
                    </OptionsArea>
                </TopBottomSection>
            </TopSection>
            <BottomSection>
                <PropertyCode>
                    <Label>Property Code</Label>
                    <Value>1006</Value>
                </PropertyCode>
                <Address>
                    <Label>Address</Label>
                    <Value>LAPG25616835454dgfcw</Value>
                </Address>
                <Longitude>
                    <Label>Longitude</Label>
                    <Value>20.1206534448479</Value>
                </Longitude>
                <LegalName>
                    <Label>Legal Name</Label>
                    <Value>BJORNEN8</Value>
                </LegalName>
                <ZipCode>
                    <Label>ZipCode</Label>
                    <Value>931 145</Value>
                </ZipCode>
                <Latitude>
                    <Label>Latitude</Label>
                    <Value>20.1206534448479</Value>
                </Latitude>
                <Name>
                    <Label>Name</Label>
                    <Value>1006</Value>
                </Name>
                <City>
                    <Label>City</Label>
                    <Value>Kiruna</Value>
                </City>
                <GeoFence>
                    <Label>Geo Fence</Label>
                    <Value>-</Value>
                </GeoFence>
                <OperationsArea>
                    <Label>Operations Area</Label>
                    <Value>1</Value>
                </OperationsArea>
                <ResponsibleUser>
                    <Label>Responsible User</Label>
                    <Value>Janus</Value>
                </ResponsibleUser>
                <AdministrativeArea>
                    <Label>Administrative Area</Label>
                    <Value>1</Value>
                </AdministrativeArea>
                <Area>
                    <Label>Area</Label>
                    <Value>76861</Value>
                </Area>
                <Owner>
                    <Label>Owner</Label>
                    <Value>1</Value>
                </Owner>
                <Buildings>
                    <Label>Buildings</Label>
                    <BuildingValue>Buildings</BuildingValue>
                </Buildings>
            </BottomSection>
        </MainContainer>
    )
}


// Export
export default PropertiesData;