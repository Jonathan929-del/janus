// Imports
import axios from 'axios';
import {useState} from 'react';
import Router from "next/router";
import styled from 'styled-components';
import Layout from '../Components/Layout';
import {BiArrowBack} from 'react-icons/bi';


// Styles
const AddNewPropertyContainer = styled.section`
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
    height:100%;
    display:grid;
    max-width:1000px;
    padding-top:50px;
    margin:0 20px 40px 0;
    grid-template-rows:repeat(5, 1fr);
    grid-template-columns:repeat(3, 1fr);
    grid-template-areas:'propertyCode address longitude'
                        'legalName zipCode latitude'
                        'name city operationsArea'
                        'responsibleUser administrativeArea area'
                        'owner . button';


    @media screen and (max-width:992px){
        grid-template-rows:repeat(8, 1fr);
        grid-template-columns:repeat(2, 1fr);
        grid-template-areas:'propertyCode address'
                            'longitude legalName'
                            'zipCode latitude'
                            'name city'
                            'operationsArea responsibleUser'
                            'administrativeArea area'
                            'owner .'
                            'button button';
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
const Input = styled.input`
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
const ButtonContainer = styled.div`
    display:flex;
    grid-area:button;
    align-items:center;
    justify-content:center;
`
const CreateButton = styled.button`
    width:100%;
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
const AddProperty = () => {

    // Adding property
    const [input, setInput] = useState({
        property_code:null,
        postal_address:'',
        longitude:'',
        legal_name:'',
        zip_code:'',
        latitude:'',
        name:'',
        postal_address:'',
        maintenance_area:'',
        administrative_area:'',
        sum_area_bta:'',
        address_label:'',
        owner:null
    });
    const propertyAdder = async () => {
        try {
            await axios.post('https://janus-server-side.herokuapp.com/properties', input);
            Router.push('/properties');
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <Layout page='add-property'>
        <AddNewPropertyContainer>
            <TopSection>
                <Heading>Add New Property</Heading>
            </TopSection>
            <BottomSection>
                <PropertyCode>
                    <Label>Property Code</Label>
                    <Input value={input.property_code} onChange={e => setInput({...input, property_code:e.target.value})}/>
                </PropertyCode>
                <Address>
                    <Label>Address</Label>
                    <Input value={input.address_label} onChange={e => setInput({...input, address_label:e.target.value})}/>
                </Address>
                <Longitude>
                    <Label>Longitude</Label>
                    <Input value={input.longitude} onChange={e => setInput({...input, longitude:e.target.value})}/>
                </Longitude>
                <LegalName>
                    <Label>Legal Name</Label>
                    <Input value={input.legal_name} onChange={e => setInput({...input, legal_name:e.target.value})}/>
                </LegalName>
                <ZipCode>
                    <Label>ZipCode</Label>
                    <Input value={input.zip_code} onChange={e => setInput({...input, zip_code:e.target.value})}/>
                </ZipCode>
                <Latitude>
                    <Label>Latitude</Label>
                    <Input value={input.latitude} onChange={e => setInput({...input, latitude:e.target.value})}/>
                </Latitude>
                <Name>
                    <Label>Name</Label>
                    <Input value={input.name} onChange={e => setInput({...input, name:e.target.value})}/>
                </Name>
                <City>
                    <Label>City</Label>
                    <Input value={input.postal_address} onChange={e => setInput({...input, postal_address:e.target.value})}/>
                </City>
                <OperationsArea>
                    <Label>Maintenance Area</Label>
                    <Input value={input.maintenance_area} onChange={e => setInput({...input, maintenance_area:e.target.value})}/>
                </OperationsArea>
                <ResponsibleUser>
                    <Label>Responsible User</Label>
                    <Input value={input.name} onChange={e => setInput({...input, user:e.target.value})}/>
                </ResponsibleUser>
                <AdministrativeArea>
                    <Label>Administrative Area</Label>
                    <Input value={input.administrative_area} onChange={e => setInput({...input, administrative_area:e.target.value})}/>
                </AdministrativeArea>
                <Area>
                    <Label>Area</Label>
                    <Input value={input.sum_area_bta} onChange={e => setInput({...input, sum_area_bta:e.target.value})}/>
                </Area>
                <Owner>
                    <Label>Owner</Label>
                    <Input value={input.owner} onChange={e => setInput({...input, owner:e.target.value})}/>
                </Owner>
                <ButtonContainer>
                    <CreateButton onClick={propertyAdder}>Add</CreateButton>
                </ButtonContainer>
            </BottomSection>
        </AddNewPropertyContainer>
    </Layout>
  )
}


// Export
export default AddProperty;