// Imports
import styled from 'styled-components';
import {AiOutlineDown} from 'react-icons/ai';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';


// Styles
const FilterContainer = styled.div`
    height:100%;
    width:100%;
    display:flex;
    color:#fff;
    flex-direction:column;
    background-color:#333F50;
    border-top:1px solid #fff;
    border-bottom:1px solid #fff;
`
const SearchArea = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const SearchInput = styled.input`
    padding:5px;
    border:none;
    outline:none;
    margin-left:10px;
    border:1px solid #ccc;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const FilterContentArea = styled.div`
    flex:9;
    height:100%;
    display:flex;
    overflow-y:scroll;
    flex-direction:column;

    &::-webkit-scrollbar{
        width:7px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius:5px;
        background-color:#c3c3c3;
    }
`
const FilterItem = styled.div`
    display:flex;
    cursor:pointer;
    min-height:70px;
    align-items:center;
    justify-content:flex-start;
    background-color:${({selectedProperty, currentProperty}) => selectedProperty ? selectedProperty.property_code === currentProperty.property_code ? '#35c7FB' : '' : ''};
`
const Buildings = styled.div`
    margin-left:20px;
    display:${({openedProperty, currentProperty}) => openedProperty === currentProperty ? 'block' : 'none'};
`
const Components = styled.div`
    margin-left:20px;
    display:${({openedBuilding, currentBuilding}) => openedBuilding === currentBuilding ? 'block' : 'none'};
`
const Activities = styled.div`
    margin-left:70px;
    display:${({openedComponent, currentComponent}) => openedComponent === currentComponent ? 'block' : 'none'};
`
const NoCom = styled.p`
    font-size:12px;
    margin-left:-10px;
`
const BuildingContent = styled.div`
    margin-left:30px;
`
const ArrowIconContainer = styled.div`
    height:100%;
    display:flex;
    font-size:12px;
    padding:0 20px;
    align-items:center;
`
const Name = styled.p`
    width:100%;
    height:100%;
    display:flex;
    font-size:14px;
    font-weight:300;
    margin-left:10px;
    align-items:center;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const LoadingIconContainer = styled.div`
    width:100%;
    display:flex;
    padding:30px 0;
    align-items:center;
    justify-content:center;
`


// Main Function
const FilterArea = ({selectedProperty, properties, propertyContentOpener, openedProperty, buildings, buildingContentOpener, openedBuilding, setIsComponentsOpened, isComponentsOpened, components, componentContentOpener, activities, openedComponent, selectedPropertyHandler}) => {
  return (
    <FilterContainer>
        <SearchArea>
            <SearchInput placeholder='Quick Filter'/>
        </SearchArea>
        <FilterContentArea>
            {properties[0].property_code ? properties.map(property => (
                <>
                    <FilterItem key={property._id} selectedProperty={selectedProperty} currentProperty={property}>
                        <ArrowIconContainer onClick={() => propertyContentOpener(property.property_code)}>
                            {openedProperty === property.property_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                        </ArrowIconContainer>
                        <Name onClick={() => selectedPropertyHandler(property.latitude)}>{`${property.property_code} ${property.name}`}</Name>
                    </FilterItem>
                    <Buildings openedProperty={openedProperty} currentProperty={property.property_code}>
                        {buildings[0].building_code ? buildings.map(building => (
                            <>
                                <FilterItem key={building._id}>
                                    <ArrowIconContainer onClick={() => buildingContentOpener(building.building_code)}>
                                        {openedBuilding === building.building_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                    </ArrowIconContainer>
                                    <Name>{`${building.building_code}`}</Name>
                                </FilterItem>
                                {openedBuilding === building.building_code &&                        
                                    <BuildingContent>
                                        <FilterItem>
                                            <ArrowIconContainer onClick={() => setIsComponentsOpened(!isComponentsOpened)}>
                                                {isComponentsOpened ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                            </ArrowIconContainer>
                                            <Name>Components</Name>
                                        </FilterItem>
                                        {isComponentsOpened &&
                                            <Components>
                                                {components.length > 0 ? components.map(component => (
                                                    <>
                                                        <FilterItem key={component._id}>
                                                            <ArrowIconContainer onClick={() => componentContentOpener(component.component_code)}>
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
                        )) :
                            <LoadingIconContainer>
                                <CircularProgress style={{color:'#fff'}}/>
                            </LoadingIconContainer>
                        }
                    </Buildings>
                </>
            )) : <LoadingIconContainer>
                    <CircularProgress style={{color:'#fff'}}/>
                </LoadingIconContainer>
            }
        </FilterContentArea>
    </FilterContainer>
  )
}


// Export
export default FilterArea;