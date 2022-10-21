// Imports
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
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
    flex-direction:column;
    padding:30px 20px 0 0;
    align-items:flex-start;
    justify-content:space-between;
    border-bottom:1px solid #ccc;
`
const TopTopSection = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const BuildingName = styled.p`
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
const BackButton = styled.button`
    border:none;
    outline:none;
    cursor:pointer;
    background-color:transparent;

    &:hover{
        text-decoration:underline;
    }
`
const BottomSection = styled.div`
    gap:20px;
    width:100%;
    display:grid;
    padding:50px;
    max-height:600px;
    max-width:1000px;
    grid-template-rows:${({isBuildingUpdate}) => isBuildingUpdate ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)'};
    grid-template-columns:${({isBuildingUpdate}) => isBuildingUpdate ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'};
    grid-template-areas:${({isBuildingUpdate}) => isBuildingUpdate ?
                                                    `'buildingCode address'
                                                    'name zipCode'
                                                    'responsibleUser city'
                                                    'longitude latitude'
                                                    'geoFence buttons'`
                                                    :
                                                    `'buildingCode address rentalObjects components'
                                                    'name zipCode rentalObjects components'
                                                    'responsibleUser city . components'
                                                    'longitude latitude geoFence .'`};

    @media screen and (max-width:992px){
        grid-template-rows:${({isBuildingUpdate}) => isBuildingUpdate ? 'repeat(5, 1fr)' : 'repeat(9, 1fr)'};
        grid-template-columns:repeat(2, 1fr);
        grid-template-areas:${({isBuildingUpdate}) => isBuildingUpdate ?
                                `'buildingCode address'
                                'name zipCode'
                                'responsibleUser city'
                                'longitude latitude'
                                'geoFence buttons'`
                                :
                                `'buildingCode components'
                                'address components'
                                'name components'
                                'zipCode rentalObjects'
                                'responsibleUser rentalObjects'
                                'city rentalObjects'
                                'longitude .'
                                'latitude .'
                                'geoFence .'`};
    }

    @media screen and (max-width:768px){
        padding:30px 10px 20px 0;
        grid-template-areas:${({isBuildingUpdate}) => isBuildingUpdate ?
                                `'buildingCode address'
                                'name zipCode'
                                'responsibleUser city'
                                'longitude latitude'
                                'geoFence buttons'`
                                :
                                `'buildingCode components'
                                'address components'
                                'name components'
                                'zipCode rentalObjects'
                                'responsibleUser rentalObjects'
                                'city rentalObjects'
                                'longitude .'
                                'latitude .'
                                'geoFence .'`};
    }
`
const BuildingCode = styled.div`
    grid-area:buildingCode;
`
const Address = styled.div`
    grid-area:address;
`
const Name = styled.div`
    grid-area:name;
`
const ZipCode = styled.div`
    grid-area:zipCode;
`
const ResponsibleUser = styled.div`
    grid-area:responsibleUser;
`
const City = styled.div`
    grid-area:city;
`
const Longitude = styled.div`
    grid-area:longitude;
`
const Latitude = styled.div`
    grid-area:latitude;
`
const GeoFence = styled.div`
    grid-area:geoFence;
`
const Components = styled.div`
    grid-area:components;
`
const RentalObjects = styled.div`
    grid-area:rentalObjects;

    @media screen and (max-width:992px){
        margin-top:50px;
    }
`
const Buttons = styled.div`
    display:flex;
    grid-area:buttons;
    align-items:center;
    justify-content:center;
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
    width:90%;
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
const ComponentsValue = styled.div`
    height:100%;
    padding:10px;
    font-size:14px;
    border-radius:5px;
    background-color:#c3c3c3;

    @media screen and (max-width:992px){
        font-size:12px;
    }
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
    margin-left:20px;
    border-radius:5px;
    transition:0.1s linear;
    background-color:#c3c3c3;

    &:hover{
        opacity:0.8;
    }
`


// Main Function
const BuildingData = ({selectedBuilding, isBuildingUpdate, setIsBuildingUpdate, setSelectedBuilding}) => {


    // Actions opener
    const [isActionsOpened, setIsActionsOpened] = useState(false);
    const actionsToggler = () => {
        setIsActionsOpened(!isActionsOpened);
    };


    // Building components
    const [components, setComponents] = useState([{}]);
    const componentsFetcher = async () => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/components/${selectedBuilding.building_code}`);
            setComponents(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    // Delete handler
    const deleteHandler = async () => {
        try {
            await axios.delete(`https://janus-server-side.herokuapp.com/buildings/${selectedBuilding._id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }


    // Update handler
    const [input, setInput] = useState({});
    const updateInitializer = () => {
        setIsBuildingUpdate(true);
        setIsActionsOpened(false);
    }
    const updateHandler = async () => {
        try {
            await axios.put(`https://janus-server-side.herokuapp.com/buildings/${selectedBuilding._id}`, input);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setInput({
            building_code:selectedBuilding.building_code,
            street_address:selectedBuilding.street_address || '-',
            name:selectedBuilding.name || '-',
            zip_code:selectedBuilding.zip_code || '-',
            responsible_user:selectedBuilding.responsible_user || '-',
            city:selectedBuilding.property_code || '-',
            longitude:selectedBuilding.longitude || '-',
            latitude:selectedBuilding.latitude || '-',
            geo_fence:selectedBuilding.geo_fence || '-'
        });
        componentsFetcher();
        setSelectedBuilding(selectedBuilding);
    }, []);


    return (
        <MainContainer>
            <TopSection>
                <TopTopSection>
                    <BackButton onClick={() => setSelectedBuilding({})}>Back to Property</BackButton>
                    <BuildingName>{`${selectedBuilding.building_code}`}</BuildingName>
                    <ActionsButtonContainer>
                        <ActionsButton onClick={actionsToggler}>
                            <ActionsButtonText>Actions</ActionsButtonText>
                            <ActionsButtonIconContainer>
                                <AiOutlineDown />
                            </ActionsButtonIconContainer>
                        </ActionsButton>
                        <ButtonContent isActionsOpened={isActionsOpened}>
                            <Action><Link href='/add-building'><a style={{color:'#000', textDecoration:'none'}}>Add New</a></Link></Action>
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
            <BottomSection isBuildingUpdate={isBuildingUpdate}>
                <BuildingCode>
                    <Label>Building Code</Label>
                    {isBuildingUpdate ? <InputValue value={input.building_code} onChange={e => setInput({...input, building_code:e.target.value})}/> : <Value>{selectedBuilding.building_code || '-'}</Value>}
                </BuildingCode>
                <Address>
                    <Label>Address</Label>
                    {isBuildingUpdate ? <InputValue value={input.street_address} onChange={e => setInput({...input, street_address:e.target.value})}/> : <Value>{selectedBuilding.street_address || '-'}</Value>}
                </Address>
                <Name>
                    <Label>Name</Label>
                    {isBuildingUpdate ? <InputValue value={input.name} onChange={e => setInput({...input, name:e.target.value})}/> : <Value>{selectedBuilding.name || '-'}</Value>}
                </Name>
                <ZipCode>
                    <Label>ZipCode</Label>
                    {isBuildingUpdate ? <InputValue value={input.zip_code} onChange={e => setInput({...input, zip_code:e.target.value})}/> : <Value>{selectedBuilding.zip_code || '-'}</Value>}
                </ZipCode>
                <ResponsibleUser>
                    <Label>ResponsibleUser</Label>
                    {isBuildingUpdate ? <InputValue value={input.responsible_user} onChange={e => setInput({...input, responsible_user:e.target.value})}/> : <Value>{selectedBuilding.responsible_user || '-'}</Value>}
                </ResponsibleUser>
                <City>
                    <Label>City</Label>
                    {isBuildingUpdate ? <InputValue value={input.city} onChange={e => setInput({...input, property_code:e.target.value})}/> : <Value>{selectedBuilding.property_code || '-'}</Value>}
                </City>
                <Longitude>
                    <Label>Longitude</Label>
                    {isBuildingUpdate ? <InputValue value={input.longitude} onChange={e => setInput({...input, longitude:e.target.value})}/> : <Value>{selectedBuilding.longitude || '-'}</Value>}
                </Longitude>
                <Latitude>
                    <Label>Latitude</Label>
                    {isBuildingUpdate ? <InputValue value={input.latitude} onChange={e => setInput({...input, latitude:e.target.value})}/> : <Value>{selectedBuilding.latitude || '-'}</Value>}
                </Latitude>
                <GeoFence>
                    <Label>GeoFence</Label>
                    {isBuildingUpdate ? <InputValue value={input.geo_fence} onChange={e => setInput({...input, geo_fence:e.target.value})}/> : <Value>{selectedBuilding.geo_fence || '-'}</Value>}
                </GeoFence>
                {!isBuildingUpdate ?
                    <>
                        <Components>
                            <Label>Components</Label>
                            <ComponentsValue>
                                {components.map(component => 
                                    <p>{component.component_code}</p>
                                )}
                            </ComponentsValue>
                        </Components>
                        <RentalObjects>
                            <Label>RentalObjects</Label>
                            <ComponentsValue>-</ComponentsValue>
                        </RentalObjects>
                    </> :
                    <Buttons>
                        <UpdateButton onClick={updateHandler}>Update</UpdateButton>
                        <CloseButton onClick={() => setIsBuildingUpdate(false)}>Cancel</CloseButton>
                    </Buttons>
                }
            </BottomSection>
        </MainContainer>
    )
}


// Export
export default BuildingData;