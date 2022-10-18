// Imports
import axios from 'axios';
import {useState} from 'react';
import Router from "next/router";
import styled from 'styled-components';
import Layout from '../Components/Layout';
import {BiArrowBack} from 'react-icons/bi';


// Styles
const AddNewBuildingContainer = styled.section`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:#fff;
`
const TopSection = styled.div`
    display:flex;
`
const Heading = styled.h1`
    font-size:25px;
    font-weight:400;
    margin-top:30px;
`
const CloseIcon = styled.span`
    top:10px;
    left:10px;
    display:flex;
    cursor:pointer;
    position:absolute;
    align-items:center;

    &:hover{
        text-decoration:underline;
    }

    @media screen and (max-width:768px){
        font-size:12px;
    }
`
const BottomSection = styled.div`
    gap:20px;
    width:100%;
    height:80vh;
    margin:auto;
    display:grid;
    padding:50px;
    max-width:1000px;
    grid-template-rows:repeat(5, 1fr);
    grid-template-columns:repeat(2, 1fr);
    grid-template-areas:'buildingCode address'
                        'name zipCode'
                        'responsibleUser city'
                        'longitude latitude'
                        'geoFence button';
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
const ButtonContainer = styled.div`
    display:flex;
    grid-area:button;
    align-items:flex-end;
    justify-content:flex-start;
`
const CreateButton = styled.button`
    width:90%;
    border:none;
    outline:none;
    color:#fff;
    height:50px;
    cursor:pointer;
    border-radius:5px;
    transition:0.1s linear;
    background-color:#35c7FB;

    &:hover{
        opacity:0.8;
    }
`


// Main Function
const AddBuilding = () => {

    // Adding property
    const [input, setInput] = useState({
        building_code:null,
        street_address:'',
        name:'',
        zip_code:'',
        responsible_user:'',
        city:'',
        longitude:'',
        latitude:'',
        geo_fence:''
    });
    const buildingAdder = async () => {
        try {
            await axios.post('https://janus-server-side.herokuapp.com/buildings', input);
            Router.push('/properties');
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <Layout page='add-property'>
        <AddNewBuildingContainer>
            <TopSection>
                <Heading>Add New Building</Heading>
                <CloseIcon onClick={() => setIsCreateOpened(false)}><BiArrowBack style={{marginRight:'5px'}}/>Back to properties</CloseIcon>
            </TopSection>
            <BottomSection>
                <BuildingCode>
                    <Label>Building Code</Label>
                    <InputValue value={input.building_code} onChange={e => setInput({...input, building_code:e.target.value})}/>
                </BuildingCode>
                <Address>
                    <Label>Address</Label>
                    <InputValue value={input.street_address} onChange={e => setInput({...input, street_address:e.target.value})}/>
                </Address>
                <Name>
                    <Label>Name</Label>
                    <InputValue value={input.name} onChange={e => setInput({...input, name:e.target.value})}/>
                </Name>
                <ZipCode>
                    <Label>ZipCode</Label>
                    <InputValue value={input.zip_code} onChange={e => setInput({...input, zip_code:e.target.value})}/>
                </ZipCode>
                <ResponsibleUser>
                    <Label>ResponsibleUser</Label>
                    <InputValue value={input.responsible_user} onChange={e => setInput({...input, responsible_user:e.target.value})}/>
                </ResponsibleUser>
                <City>
                    <Label>City</Label>
                    <InputValue value={input.city} onChange={e => setInput({...input, city:e.target.value})}/>
                </City>
                <Longitude>
                    <Label>Longitude</Label>
                    <InputValue value={input.longitude} onChange={e => setInput({...input, longitude:e.target.value})}/>
                </Longitude>
                <Latitude>
                    <Label>Latitude</Label>
                    <InputValue value={input.latitude} onChange={e => setInput({...input, latitude:e.target.value})}/>
                </Latitude>
                <GeoFence>
                    <Label>GeoFence</Label>
                    <InputValue value={input.geo_fence} onChange={e => setInput({...input, geo_fence:e.target.value})}/>
                </GeoFence>
                <ButtonContainer>
                    <CreateButton onClick={buildingAdder}>Add</CreateButton>
                </ButtonContainer>
            </BottomSection>
        </AddNewBuildingContainer>
    </Layout>
  )
}


// Export
export default AddBuilding;