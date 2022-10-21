// Imports
import axios from 'axios';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {AiOutlineDown} from 'react-icons/ai';
import Link from 'next/link';


// Styles
const MainContainer = styled.div`
    height:100%;
    display:flex;
    margin-left:20px;
    flex-direction:column;
`
const TopSection = styled.div`
    display:flex;
    align-items:flex-start;
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
    width:100%;
    display:grid;
    max-width:1000px;
    max-height:800px;
    padding:30px 20px 20px 0;
    grid-template-rows:repeat(5, 1fr);
    grid-template-columns:repeat(4, 1fr);
    grid-template-areas:'propertyCode address longitude buildings'
                        'legalName zipCode latitude buildings'
                        'name city operationsArea buildings'
                        'responsibleUser administrativeArea area .'
                        'owner . . .';

    @media screen and (max-width:992px){
        grid-template-rows:repeat(9, 1fr);
        grid-template-columns:repeat(3, 1fr);
        grid-template-areas:'propertyCode address buildings'
                            'longitude legalName buildings'
                            'zipCode latitude buildings'
                            'name city buildings'
                            'operationsArea responsibleUser .'
                            'administrativeArea area .'
                            'owner . .';
        gap:10px;
        height:500px;
    }

    @media screen and (max-width:768px){
        grid-template-rows:repeat(13, 1fr);
        grid-template-columns:repeat(2, 1fr);
        grid-template-areas:'propertyCode buildings'
                            'address buildings'
                            'longitude buildings'
                            'legalName buildings'
                            'zipCode buildings'
                            'latitude .'
                            'name .'
                            'city .'
                            'operationsArea .'
                            'responsibleUser .'
                            'administrativeArea .'
                            'area .'
                            'owner .';
        gap:15px;
        height:unset;
        padding-bottom:50px;
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
const InputValue = styled.input`
    border:none;
    outline:none;
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
const UpdateButtons = styled.div`
    width:100%;
    max-width:180px;
    display:flex;
    justify-content:space-between;
`
const UpdateButton = styled.button`
    border:none;
    outline:none;
    color:#fff;
    cursor:pointer;
    padding:7px 20px;
    border-radius:5px;
    transition:0.1s linear;
    background-color:#35c7FB;

    &:hover{
        opacity:0.8;
    }
`
const CloseButton = styled.button`
    border:none;
    outline:none;
    color:#fff;
    cursor:pointer;
    padding:7px 20px;
    border-radius:5px;
    transition:0.1s linear;
    background-color:#c3c3c3;

    &:hover{
        opacity:0.8;
    }
`


// Main Function
const PropertyDataSection = ({selectedProperty, propertyBuildings, isUpdate, setIsUpdate, setSelectedProperty}) => {


    // Actions opener
    const [isActionsOpened, setIsActionsOpened] = useState(false);
    const actionsToggler = () => {
        setIsActionsOpened(!isActionsOpened);
    };


    // Delete handler
    const deleteHandler = async () => {
        try {
            await axios.delete(`https://janus-server-side.herokuapp.com/properties/${selectedProperty._id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };


    // Update handler
    const [input, setInput] = useState();
    const updateInitializer = () => {
        selectedProperty && setIsUpdate(true);
        setIsActionsOpened(false);
    };
    const updateHandler = async () => {
        try {
            await axios.put(`https://janus-server-side.herokuapp.com/properties/${selectedProperty._id}`, input);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setInput({
            property_code:selectedProperty.property_code,
            postal_address:selectedProperty.postal_address,
            longitude:selectedProperty.longitude,
            legal_name:selectedProperty.legal_name,
            zip_code:selectedProperty.zip_code,
            latitude:selectedProperty.latitude,
            name:selectedProperty.name,
            postal_address:selectedProperty.postal_address,
            maintenance_area:selectedProperty.maintenance_area,
            administrative_area:selectedProperty.administrative_area,
            sum_area_bta:selectedProperty.sum_area_bta,
            address_label:selectedProperty.address_label,
            owner:selectedProperty.owner
        });
    }, [isUpdate]);
        
    return (
        <MainContainer>
            <TopSection>
                <TopTopSection>
                    <PropertyName>{selectedProperty.property_code ? `${selectedProperty.property_code} ${selectedProperty.name}` : ''}</PropertyName>
                    <ActionsButtonContainer>
                        <ActionsButton onClick={actionsToggler}>
                            <ActionsButtonText>Actions</ActionsButtonText>
                            <ActionsButtonIconContainer>
                                <AiOutlineDown />
                            </ActionsButtonIconContainer>
                        </ActionsButton>
                        <ButtonContent isActionsOpened={isActionsOpened}>
                            <Action><Link href='/add-property'><a style={{color:'#000', textDecoration:'none'}}>Add New</a></Link></Action>
                            <Action onClick={updateInitializer}>Modify</Action>
                            <LastAction onClick={deleteHandler}>Delete</LastAction>
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
                    {!isUpdate ? <Value>{selectedProperty.property_code}</Value> : <InputValue value={input.property_code} onChange={e => setInput({...input, property_code:e.target.value})}/>}
                </PropertyCode>
                <Address>
                    <Label>Address</Label>
                    {!isUpdate ? <Value>{selectedProperty.address_label}</Value> : <InputValue value={input.address_label} onChange={e => setInput({...input, address_label:e.target.value})}/>}
                </Address>
                <Longitude>
                    <Label>Longitude</Label>
                    {!isUpdate ? <Value>{selectedProperty.longitude || '-'}</Value> : <InputValue value={input.longitude} onChange={e => setInput({...input, longitude:e.target.value})}/>}
                </Longitude>
                <LegalName>
                    <Label>Legal Name</Label>
                    {!isUpdate ? <Value>{selectedProperty.legal_name}</Value> : <InputValue value={input.legal_name} onChange={e => setInput({...input, legal_name:e.target.value})}/>}
                </LegalName>
                <ZipCode>
                    <Label>ZipCode</Label>
                    {!isUpdate ? <Value>{selectedProperty.zip_code}</Value> : <InputValue value={input.zip_code} onChange={e => setInput({...input, zip_code:e.target.value})}/>}
                </ZipCode>
                <Latitude>
                    <Label>Latitude</Label>
                    {!isUpdate ? <Value>{selectedProperty.latitude || '-'}</Value> : <InputValue value={input.latitude} onChange={e => setInput({...input, latitude:e.target.value})}/>}
                </Latitude>
                <Name>
                    <Label>Name</Label>
                    {!isUpdate ? <Value>{selectedProperty.name}</Value> : <InputValue value={input.name} onChange={e => setInput({...input, name:e.target.value})}/>}
                </Name>
                <City>
                    <Label>City</Label>
                    {!isUpdate ? <Value>{selectedProperty.postal_address}</Value> : <InputValue value={input.postal_address} onChange={e => setInput({...input, postal_address:e.target.value})}/>}
                </City>
                <OperationsArea>
                    <Label>Maintenance Area</Label>
                    {!isUpdate ? <Value>{selectedProperty.maintenance_area}</Value> : <InputValue value={input.maintenance_area} onChange={e => setInput({...input, maintenance_area:e.target.value})}/>}
                </OperationsArea>
                <ResponsibleUser>
                    <Label>Responsible User</Label>
                    {!isUpdate ? <Value>{selectedProperty.name}</Value> : <InputValue value={input.name} onChange={e => setInput({...input, user:e.target.value})}/>}
                </ResponsibleUser>
                <AdministrativeArea>
                    <Label>Administrative Area</Label>
                    {!isUpdate ? <Value>{selectedProperty.administrative_area}</Value> : <InputValue value={input.administrative_area} onChange={e => setInput({...input, administrative_area:e.target.value})}/>}
                </AdministrativeArea>
                <Area>
                    <Label>Area</Label>
                    {!isUpdate ? <Value>{selectedProperty.sum_area_bta}</Value> : <InputValue value={input.sum_area_bta} onChange={e => setInput({...input, sum_area_bta:e.target.value})}/>}
                </Area>
                <Owner>
                    <Label>Owner</Label>
                    {!isUpdate ? <Value>{selectedProperty.owner}</Value> : <InputValue value={input.owner} onChange={e => setInput({...input, owner:e.target.value})}/>}
                </Owner>
                <Buildings>
                    {isUpdate ?
                        <UpdateButtons>
                            <UpdateButton onClick={updateHandler}>Update</UpdateButton>
                            <CloseButton onClick={() => setIsUpdate(false)}>Cancel</CloseButton>
                        </UpdateButtons>
                        :
                        <>
                            <Label>Buildings</Label>
                            <BuildingValue>
                                {propertyBuildings.map(building => 
                                    <Building>
                                        {building.building_code}
                                    </Building>
                                )}
                            </BuildingValue>
                        </>
                    }
                </Buildings>
            </BottomSection>
        </MainContainer>
    )
}


// Export
export default PropertyDataSection;