// Imports
import axios from 'axios';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import Layout from '../Components/Layout';
import {AiOutlineForward} from 'react-icons/ai';
import FilterArea from '../Components/FilterArea';
import PropertiesData from '../Components/PropertiesData';


// Styles
const PropertiesContainer = styled.section`
    display:flex;
    position:relative;
    height:calc(100vh - 70px);
`
const FilterSection = styled.div`
    z-index:2;
    height:100%;
    display:flex;
    min-width:300px;
    position:fixed;
    align-items:center;
    background-color:transparent;
    left:${({isFilterOpened}) => isFilterOpened ? '250px' : '-100vh'};

    @media screen and (max-width:768px){
        left:${({isFilterOpened}) => isFilterOpened ? '150px' : '-100vh'};
    }
`
const FilterOpenIcon = styled.div`
    top:25%;
    color:#fff;
    display:flex;
    font-size:20px;
    cursor:pointer;
    position:fixed;
    align-items:center;
    padding:5px 5px 0 10px;
    justify-content:center;
    background-color:#35c7FB;
    border-radius:0 5px 5px 0;
    display:${({isFilterOpened}) => isFilterOpened ? 'none' : 'block'};
`
const DataSection = styled.div`
    width:100%;
`


// Main Function
const Properties = () => {


    // Opening and closing filter
    const [isFilterOpened, setIsFilterOpened] = useState(true);
    const filterToggler = () => {
        setIsFilterOpened(!isFilterOpened);
    }


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
            console.log(activities);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Layout page='properties'>
            <PropertiesContainer>
                <FilterSection isFilterOpened={isFilterOpened}>
                    <FilterArea
                        filterToggler={filterToggler}
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
                    />
                </FilterSection>
                <FilterOpenIcon isFilterOpened={isFilterOpened} onClick={filterToggler}>
                    <AiOutlineForward />
                </FilterOpenIcon>
                <DataSection isFilterOpened={isFilterOpened}>
                    <PropertiesData />
                </DataSection>
            </PropertiesContainer>
        </Layout>
    )
}


// Export
export default Properties;