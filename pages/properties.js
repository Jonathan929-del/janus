// Imports
import axios from 'axios';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import Layout from '../Components/Layout';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
import {AiOutlineBackward, AiOutlineForward, AiOutlineDown} from 'react-icons/ai';


// Styles
const PropertiesContainer = styled.section`
    display:flex;
    position:relative;
    height:calc(100vh - 70px);
`
const FilterSection = styled.div`
    height:100%;
    display:flex;
    min-width:250px;
    position:absolute;
    align-items:center;
    left:${({isFilterOpened}) => isFilterOpened ? '0' : '-100vh'};
`
const FilterContainer = styled.div`
    height:80%;
    width:100%;
    display:flex;
    flex-direction:column;
    border:2px solid #ccc;
`
const SearchArea = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    border-bottom:1px solid #ccc;
    justify-content:space-between;
`
const SearchInput = styled.input`
    padding:5px;
    border:none;
    outline:none;
    margin-left:10px;
    border:1px solid #ccc;
`
const CollapseIconContainer = styled.div`
    height:100%;
    display:flex;
    cursor:pointer;
    margin-right:10px;
    align-items:center;
`
const FilterContentArea = styled.div`
    flex:9;
    display:flex;
    overflow-y:scroll;
    flex-direction:column;

    &::-webkit-scrollbar{
        width:7px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius:5px;
        background-color:#5c5c5c;
    }
`
const FilterItem = styled.div`
    display:flex;
    cursor:pointer;
    align-items:center;
    padding:10px 0 10px 5px;
    justify-content:flex-start;
`
const Buildings = styled.div`
    margin-left:30px;
    display:${({openedProperty, currentProperty}) => openedProperty === currentProperty ? 'block' : 'none'};
`
const Components = styled.div`
    margin-left:30px;
    display:${({openedBuilding, currentBuilding}) => openedBuilding === currentBuilding ? 'block' : 'none'};
`
const Activities = styled.div`
    margin-left:30px;
    display:${({openedComponent, currentComponent}) => openedComponent === currentComponent ? 'block' : 'none'};
`
const NoCom = styled.p`
    font-size:12px;
    margin-left:10px;
`
const BuildingContent = styled.div`
    margin-left:30px;
`
const ArrowIconContainer = styled.div`
    height:100%;
    display:flex;
    font-size:12px;
    align-items:center;
`
const Name = styled.p`
    height:100%;
    color:#5c5c5c;
    font-size:14px;
    font-weight:500;
    margin-left:10px;
`
const FilterOpenIcon = styled.div`
    top:25%;
    color:#fff;
    display:flex;
    font-size:20px;
    cursor:pointer;
    position:absolute;
    align-items:center;
    padding:5px 5px 0 10px;
    justify-content:center;
    background-color:#35c7FB;
    border-radius:0 5px 5px 0;
    display:${({isFilterOpened}) => isFilterOpened ? 'none' : 'block'};
`
const DataSection = styled.div`
    margin-left:${({isFilterOpened}) => isFilterOpened ? '250px' : '0'};
    width:${({isFilterOpened}) => isFilterOpened ? 'calc(100% - 250px)' : '100%'};
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
    }, []);


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
                    <FilterContainer>
                        <SearchArea>
                            <SearchInput placeholder='Quick Filter'/>
                            <CollapseIconContainer><AiOutlineBackward onClick={filterToggler}/></CollapseIconContainer>
                        </SearchArea>
                        <FilterContentArea>
                            {properties.map(property => (
                                <>
                                    <FilterItem key={property._id} onClick={() => propertyContentOpener(property.property_code)}>
                                        <ArrowIconContainer>
                                            {openedProperty === property.property_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                        </ArrowIconContainer>
                                        <Name>{`${property.property_code} ${property.name}`}</Name>
                                    </FilterItem>
                                    <Buildings openedProperty={openedProperty} currentProperty={property.property_code}>
                                        {buildings.map(building => (
                                            <>
                                                <FilterItem key={building._id} onClick={() => buildingContentOpener(building.building_code)}>
                                                    <ArrowIconContainer>
                                                        {openedBuilding === building.building_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                                    </ArrowIconContainer>
                                                    <Name>{`${building.building_code}`}</Name>
                                                </FilterItem>
                                                {openedBuilding === building.building_code &&                        
                                                    <BuildingContent>
                                                        <FilterItem onClick={() => setIsComponentsOpened(!isComponentsOpened)}>
                                                            <ArrowIconContainer>
                                                                {isComponentsOpened ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                                            </ArrowIconContainer>
                                                            <Name>Components</Name>
                                                        </FilterItem>
                                                        {isComponentsOpened &&
                                                            <Components>
                                                                {components.length > 0 ? components.map(component => (
                                                                    <>
                                                                        <FilterItem key={component._id} onClick={() => componentContentOpener(component.component_code)}>
                                                                            <ArrowIconContainer>
                                                                                <MdOutlineArrowForwardIos />
                                                                            </ArrowIconContainer>
                                                                            <Name>{`${component.component_code}`}</Name>
                                                                        </FilterItem>
                                                                        {openedComponent === component.component_code &&
                                                                            <Activities>
                                                                                {activities.length > 0 ? activities.map(activity => (
                                                                                    <FilterItem key={activity._id}>
                                                                                        <Name>{`${activity.user}`}</Name>
                                                                                    </FilterItem>
                                                                                )) : <NoCom>No Activities to Show</NoCom>}
                                                                            </Activities>
                                                                        }
                                                                    </>
                                                                )) : <NoCom>No Components to Show</NoCom>}
                                                            </Components>
                                                        }
                                                        <FilterItem>
                                                            <ArrowIconContainer>
                                                                <MdOutlineArrowForwardIos />
                                                            </ArrowIconContainer>
                                                            <Name>Rental Objects</Name>
                                                        </FilterItem>
                                                    </BuildingContent>
                                                }
                                            </>
                                        ))}
                                    </Buildings>
                                </>
                            ))}
                        </FilterContentArea>
                    </FilterContainer>
                </FilterSection>
                <FilterOpenIcon isFilterOpened={isFilterOpened} onClick={filterToggler}>
                    <AiOutlineForward />
                </FilterOpenIcon>
                <DataSection isFilterOpened={isFilterOpened}></DataSection>
            </PropertiesContainer>
        </Layout>
    )
}


// Export
export default Properties;