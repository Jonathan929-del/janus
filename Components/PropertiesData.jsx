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

    @media screen and (max-width:600px){
        font-size:12px;
    }
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

    @media screen and (max-width:600px){
        font-size:11px;
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

    @media screen and (max-width:600px){
        font-size:11px;
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
    max-width:1000px;
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

    @media screen and (max-width:992px){
        grid-template-rows:repeat(14, 1fr);
        grid-template-columns:repeat(2, 1fr);
        grid-template-areas:'propertyCode buildings'
                            'address buildings'
                            'longitude buildings'
                            'legalName buildings'
                            'zipCode buildings'
                            'latitude .'
                            'name .'
                            'city .'
                            'geoFence .'
                            'operationsArea .'
                            'responsibleUser .'
                            'administrativeArea .'
                            'area .'
                            'owner .';
        gap:5px;
        height:unset;
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
const Building = styled.p`
    margin-top:10px;
`
const NoProp = styled.div`
    width:100%;
    padding:20px 0;
    text-align:center;
`


// Main Function
const PropertiesData = ({selectedProperty, propertyBuildings}) => {

    const [isActionsOpened, setIsActionsOpened] = useState(false);
    const actionsToggler = () => {
        setIsActionsOpened(!isActionsOpened);
    };

    return (
        <MainContainer>
            {selectedProperty.property_code ?
                <>
                    <TopSection>
                        <TopTopSection>
                            <PropertyName>{`${selectedProperty.property_code} ${selectedProperty.name}`}</PropertyName>
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
                            <Value>{selectedProperty.property_code}</Value>
                        </PropertyCode>
                        <Address>
                            <Label>Address</Label>
                            <Value>{selectedProperty.address_label}</Value>
                        </Address>
                        <Longitude>
                            <Label>Longitude</Label>
                            <Value>{selectedProperty.longitude}</Value>
                        </Longitude>
                        <LegalName>
                            <Label>Legal Name</Label>
                            <Value>{selectedProperty.legal_name}</Value>
                        </LegalName>
                        <ZipCode>
                            <Label>ZipCode</Label>
                            <Value>{selectedProperty.zip_code}</Value>
                        </ZipCode>
                        <Latitude>
                            <Label>Latitude</Label>
                            <Value>{selectedProperty.latitude}</Value>
                        </Latitude>
                        <Name>
                            <Label>Name</Label>
                            <Value>{selectedProperty.name}</Value>
                        </Name>
                        <City>
                            <Label>City</Label>
                            <Value>{selectedProperty.postal_address}</Value>
                        </City>
                        <GeoFence>
                            <Label>Geo Fence</Label>
                            <Value>-</Value>
                        </GeoFence>
                        <OperationsArea>
                            <Label>Operations Area</Label>
                            <Value>-</Value>
                        </OperationsArea>
                        <ResponsibleUser>
                            <Label>Responsible User</Label>
                            <Value>{selectedProperty.responsible_user || '-'}</Value>
                        </ResponsibleUser>
                        <AdministrativeArea>
                            <Label>Administrative Area</Label>
                            <Value>{selectedProperty.administrative_area}</Value>
                        </AdministrativeArea>
                        <Area>
                            <Label>Area</Label>
                            <Value>-</Value>
                        </Area>
                        <Owner>
                            <Label>Owner</Label>
                            <Value>{selectedProperty.owner}</Value>
                        </Owner>
                        <Buildings>
                            <Label>Buildings</Label>
                            <BuildingValue>
                                {propertyBuildings.map(building => 
                                    <Building>
                                        {building.building_code}
                                    </Building>
                                )}
                            </BuildingValue>
                        </Buildings>
                    </BottomSection>
                </>
                : <NoProp>No properties selected</NoProp>
            }
        </MainContainer>
    )
}


// Export
export default PropertiesData;