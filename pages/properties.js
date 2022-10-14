// Imports
import axios from 'axios';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import Layout from '../Components/Layout';
import FilterArea from '../Components/FilterArea';
import PropertiesData from '../Components/PropertiesData';


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

    @media screen and (max-width:992px){
        max-width:150px;
    }

    @media screen and (max-width:768px){
        left:${({isFilterOpened}) => isFilterOpened ? '150px' : '-100vh'};
    }
`
const DataSection = styled.div`
    width:100%;
`


// Main Function
const Properties = () => {


    // Fetching filter data
    const [properties, setProperties] = useState([{}]);
    const [buildings, setBuildings] = useState([{}]);
    const [components, setComponents] = useState([{}]);
    const [activities, setActivities] = useState([{}]);
    useEffect(() => {
        const dataFetcher = async () => {
            try {
                const propertiesRes = await axios.get('https://janus-server-side.herokuapp.com/properties');
                setProperties(propertiesRes.data);
            } catch (err) {
                console.log(err);
            }
        }
        dataFetcher();
    }, [FilterArea]);


    // Opening sub contents
    const [openedProperty, setOpenedProperty] = useState();
    const [openedBuilding, setOpenedBuilding] = useState();
    const [openedComponent, setOpenedComponent] = useState();
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
    const buildingContentOpener = async id => {
        try {
            openedBuilding === '' ? setOpenedBuilding(id) : openedBuilding === id ? setOpenedBuilding('') : setOpenedBuilding(id);
            const componentsRes = await axios.get(`https://janus-server-side.herokuapp.com/components/${id}`);
            setComponents(componentsRes.data);
        } catch (err) {
            console.log(err);
        }
    };
    const componentContentOpener = async id => {
        try {
            openedComponent === '' ? setOpenedComponent(id) : openedComponent === id ? setOpenedComponent('') : setOpenedComponent(id);
            const activitiesRes = await axios.get(`https://janus-server-side.herokuapp.com/activities/${id}`);
            setActivities(activitiesRes.data);
        } catch (err) {
            console.log(err);
        }
    };


    // Fetching property data
    const [selectedProperty, setSelectedProperty] = useState({});
    const [propertyBuildings, setPropertyBuildings] = useState([{}]);
    const selectedPropertyHandler = async id => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/properties/${id}`);
            setSelectedProperty(res.data);
            const buildingsRes = await axios.get(`https://janus-server-side.herokuapp.com/buildings/${res.data.property_code}`);
            setPropertyBuildings(buildingsRes.data);
            filterToggler();
        } catch (err) {
            console.log(err);
        }
    };


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
                        componentContentOpener={componentContentOpener}
                        activities={activities}
                        openedComponent={openedComponent}
                        selectedPropertyHandler={selectedPropertyHandler}
                        selectedProperty={selectedProperty}
                    />
                </FilterSection>
                <DataSection>
                    <PropertiesData
                        selectedProperty={selectedProperty}
                        propertyBuildings={propertyBuildings}
                    />
                </DataSection>
            </PropertiesContainer>
        </Layout>
    )
}


// Export
export default Properties;