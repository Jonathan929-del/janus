// Imports
import axios from 'axios';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import Layout from '../Components/Layout';
import FilterArea from '../Components/FilterArea';
import BuildingData from '../Components/BuildingData';
import ComponentData from '../Components/ComponentData';
import PropertyDataSection from '../Components/PropertyDataSection';


// Styles
const PropertiesContainer = styled.section`
    display:flex;
    position:relative;
    height:calc(100vh - 70px);
`
const FilterSection = styled.div`
    left:0;
    z-index:3;
    top:370px;
    height:70%;
    display:flex;
    position:fixed;
    max-width:250px;
    align-items:center;
    background-color:transparent;
    
    @media screen and (max-width:768px){
        max-width:150px;
    }
`
const DataSection = styled.div`
    width:100%;
`
const NoProp = styled.div`
    width:100%;
    padding:20px 0;
    text-align:center;
`


// Main Function
const Properties = () => {


    // Fetching filter data
    const [properties, setProperties] = useState([{}]);
    const [buildings, setBuildings] = useState([{}]);
    const [components, setComponents] = useState([{}]);
    const [selectedProperty, setSelectedProperty] = useState({});
    
    
    // Opening sub contents
    const [openedProperty, setOpenedProperty] = useState();
    const [openedBuilding, setOpenedBuilding] = useState();
    const [isComponentsOpened, setIsComponentsOpened] = useState(false);
    const propertyContentOpener = async id => {
        try {
            openedProperty === '' ? setOpenedProperty(id) : openedProperty === id ? setOpenedProperty('') : setOpenedProperty(id);
            const buildingsRes = await axios.get(`https://janus-server-side.herokuapp.com/buildings/${id}`);
            setBuildings(buildingsRes.data);
        } catch (err) {
            console.log(err);
        }
    };
    const defaultOpenedProperty = async id => {
        try {
            setOpenedProperty(id);
            const buildingsRes = await axios.get(`https://janus-server-side.herokuapp.com/buildings/${id}`);
            setBuildings(buildingsRes.data);
        } catch (err) {
            console.log(err);
        }
    };
    const buildingContentOpener = async id => {
        try {
            openedBuilding === '' ? setOpenedBuilding(id) : openedBuilding === id ? setOpenedBuilding('') : setOpenedBuilding(id);
            const componentsRes = await axios.get(`https://janus-server-side.herokuapp.com/components/${id}`);
            setComponents(componentsRes.data);
        } catch (err) {
            console.log(err);
        }
    };
    const defaultOpenedBuilding = async id => {
        try {
            defaultOpenedProperty(selectedComponent?.property_code);
            setOpenedBuilding(id);
            const componentsRes = await axios.get(`https://janus-server-side.herokuapp.com/components/${id}`);
            setComponents(componentsRes.data);
            setIsComponentsOpened(true);
        } catch (err) {
            console.log(err);
        }
    };


    // Fetching property data
    const [propertyBuildings, setPropertyBuildings] = useState([{}]);
    const [isUpdate, setIsUpdate] = useState(false);
    const selectedPropertyHandler = async id => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/properties/property-id/${id}`);
            setIsUpdate(false);
            setSelectedProperty(res.data);
            Cookie.set('property', id);
            Cookie.remove('building');
            Cookie.remove('component');
            setSelectedBuilding({});
            setSelectedComponent({});
        } catch (err) {
            console.log(err);
        }
    };


    // Fetching building data
    const [isBuildingUpdate, setIsBuildingUpdate] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState({});
    const selectedBuildingHandler = async id => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/buildings/building-id/${id}`);
            setIsBuildingUpdate(false);
            setSelectedBuilding(res.data);
            Cookie.set('building', id);
            Cookie.remove('component');
            Cookie.remove('property');
            setSelectedComponent({});
            setSelectedProperty({});
        } catch (err) {
            console.log(err);
        }
    };


    // Fetching component data
    const [isComponentUpdate, setIsComponentUpdate] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState({});
    const selectedComponentHandler = async id => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/components/component-id/${id}`);
            setIsComponentUpdate(false);
            setSelectedComponent(res.data);
            Cookie.set('component', id);
            Cookie.remove('property');
            Cookie.remove('building');
            setSelectedProperty({});
            setSelectedBuilding({});
        } catch (err) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const dataFetcher = async () => {
            try {
                const propertiesRes = await axios.get('https://janus-server-side.herokuapp.com/properties');
                setProperties(propertiesRes.data.sort((a, b) => a.property_code - b.property_code));
                const res = Cookie.get('property') && await axios.get(`https://janus-server-side.herokuapp.com/properties/property-id/${Cookie.get('property')}`);
                Cookie.get('property') && setSelectedProperty(res.data);
                const buildingRes = Cookie.get('building') && await axios.get(`https://janus-server-side.herokuapp.com/buildings/building-id/${Cookie.get('building')}`);
                Cookie.get('building') && setSelectedBuilding(buildingRes.data);
                const componentRes = Cookie.get('component') && await axios.get(`https://janus-server-side.herokuapp.com/components/component-id/${Cookie.get('component')}`);
                Cookie.get('component') && setSelectedComponent(componentRes.data);
                const buildingsRes = selectedProperty?.property_code && await axios.get(`https://janus-server-side.herokuapp.com/buildings/${selectedProperty?.property_code}`);
                selectedProperty?.property_code && setPropertyBuildings(buildingsRes?.data);
            } catch (err) {
                console.log(err);
            }
        }
        dataFetcher();
    }, [Cookie.get('property'), Cookie.get('building'), Cookie.get('component')]);
    


    // List use effect
    useEffect(() => {
        selectedBuilding?._id && defaultOpenedProperty(selectedBuilding?.property_code);
        selectedComponent?._id && defaultOpenedBuilding(selectedComponent?.building_code);
    }, [selectedBuilding, selectedComponent]);

    
    return (
        <Layout page='properties'>
            <PropertiesContainer>
                <FilterSection>
                    <FilterArea
                        properties={properties}
                        propertyContentOpener={propertyContentOpener}
                        openedProperty={openedProperty}
                        buildings={buildings}
                        buildingContentOpener={buildingContentOpener}
                        openedBuilding={openedBuilding}
                        setIsComponentsOpened={setIsComponentsOpened}
                        isComponentsOpened={isComponentsOpened}
                        components={components}
                        selectedPropertyHandler={selectedPropertyHandler}
                        selectedProperty={selectedProperty}
                        selectedBuilding={selectedBuilding}
                        selectedBuildingHandler={selectedBuildingHandler}
                        selectedComponent={selectedComponent}
                        selectedComponentHandler={selectedComponentHandler}
                    />
                </FilterSection>
                <DataSection>
                {
                    !selectedComponent?._id
                        ? !selectedBuilding?._id
                            ? selectedProperty
                                ?   <PropertyDataSection
                                        selectedProperty={selectedProperty}
                                        setSelectedProperty={setSelectedProperty}
                                        propertyBuildings={propertyBuildings}
                                        isUpdate={isUpdate}
                                        setIsUpdate={setIsUpdate}
                                    />
                                : <NoProp>No properties selected</NoProp>
                            : <BuildingData 
                                selectedBuilding={selectedBuilding}
                                setSelectedBuilding={setSelectedBuilding}
                                isBuildingUpdate={isBuildingUpdate}
                                setIsBuildingUpdate={setIsBuildingUpdate}
                                selectedPropertyHandler={selectedPropertyHandler}
                            />
                        : <ComponentData
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                            isComponentUpdate={isComponentUpdate}
                            setIsComponentUpdate={setIsComponentUpdate}
                            selectedBuilding={selectedBuilding}
                            setSelectedBuilding={setSelectedBuilding}
                            selectedBuildingHandler={selectedBuildingHandler}
                        />
                    }
                </DataSection>
            </PropertiesContainer>
        </Layout>
    )
}


// Export
export default Properties;