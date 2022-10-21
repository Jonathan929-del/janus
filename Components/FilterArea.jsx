// Imports
import styled from 'styled-components';
import {AiOutlineDown} from 'react-icons/ai';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';


// Styles
const FilterContainer = styled.div`
    width:100%;
    height:100%;
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

    @media screen and (max-width:768px){
        width:90%;
        margin-left:5px;
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
    background-color:${({selectedProperty, currentProperty, selectedBuilding, selectedComponent}) => !selectedComponent._id ? !selectedBuilding._id && selectedProperty ? selectedProperty.property_code === currentProperty.property_code ? '#35c7FB' : '' : '' : ''};

    @media screen and (max-width:768px){
        min-height:50px;
    }
`
const Buildings = styled.div`
    margin-left:20px;
    display:${({openedProperty, currentProperty}) => openedProperty === currentProperty ? 'block' : 'none'};
`
const Components = styled.div`
    height:100%;
    margin-left:20px;

    @media screen and (max-width:768px){
        margin-left:0;
    }
`
const NoCom = styled.p`
    font-size:12px;
    margin-left:-10px;

    @media screen and (max-width:768px){
        font-size:10px;
        margin-left:-50px;
    }
`
const BuildingContent = styled.div`
    margin-left:20px;
`
const ArrowIconContainer = styled.div`
    height:100%;
    display:flex;
    font-size:12px;
    padding:0 20px;
    align-items:center;

    @media screen and (max-width:768px){
        padding:0 10px;
        font-size:10px;
    }
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

    @media screen and (max-width:768px){
        font-size:10px;
        margin-left:5px;
    }
`
const LoadingIconContainer = styled.div`
    width:100%;
    display:flex;
    padding:30px 0;
    align-items:center;
    justify-content:center;
`
const ComponentContainerFilterItem = styled.div`
    height:70px;
    display:flex;
    cursor:pointer;
    min-height:70px;
    align-items:center;
    justify-content:flex-start;
    background-color:${({selectedProperty, currentProperty}) => selectedProperty ? selectedProperty.property_code === currentProperty.property_code ? '#35c7FB' : '' : ''};

    @media screen and (max-width:768px){
        min-height:50px;
        margin-left:-20px;
    }
`
const NestedFilterItem = styled.div`
    height:70px;
    display:flex;
    cursor:pointer;
    min-height:70px;
    margin-left:30px;
    align-items:center;
    justify-content:flex-start;
    background-color:${({selectedComponent, currentComponent}) => selectedComponent._id ? selectedComponent.component_code === currentComponent.component_code ? '#35c7FB' : '' : ''};

    @media screen and (max-width:768px){
        min-height:50px;
    }
`

const BuildingFilterItem = styled.div`
    height:70px;
    display:flex;
    cursor:pointer;
    min-height:70px;
    align-items:center;
    justify-content:flex-start;
    background-color:${({selectedBuilding, currentBuilding, selectedComponent}) => !selectedComponent._id ? selectedBuilding._id ? selectedBuilding._id === currentBuilding._id ? '#35c7FB' : '' : '' : ''};

    @media screen and (max-width:768px){
        min-height:50px;
    }
`


// Main Function
const FilterArea = ({selectedProperty, properties, propertyContentOpener, openedProperty, buildings, buildingContentOpener, openedBuilding, setIsComponentsOpened, isComponentsOpened, components, selectedPropertyHandler, selectedBuilding, selectedBuildingHandler, selectedComponent, selectedComponentHandler}) => {
      return (
    <FilterContainer>
        <SearchArea>
            <SearchInput placeholder='Quick Filter'/>
        </SearchArea>
        <FilterContentArea>
            {properties[0].property_code ? properties.map(property => (
                <>
                    <FilterItem key={property._id} selectedProperty={selectedProperty} currentProperty={property} selectedBuilding={selectedBuilding} selectedComponent={selectedComponent}>
                        <ArrowIconContainer onClick={() => propertyContentOpener(property.property_code)}>
                            {openedProperty === property.property_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                        </ArrowIconContainer>
                        <Name onClick={() => selectedPropertyHandler(property._id)}>{`${property.property_code} ${property.name}`}</Name>
                    </FilterItem>
                    <Buildings openedProperty={openedProperty} currentProperty={property.property_code}>
                        {buildings[0].building_code ? buildings.map(building => (
                            <>
                                <BuildingFilterItem key={building._id} selectedBuilding={selectedBuilding} currentBuilding={building} selectedComponent={selectedComponent}>
                                    <ArrowIconContainer onClick={() => buildingContentOpener(building.building_code)}>
                                        {openedBuilding === building.building_code ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                    </ArrowIconContainer>
                                    <Name onClick={() => selectedBuildingHandler(building._id)}>{`${building.building_code}`}</Name>
                                </BuildingFilterItem>
                                {openedBuilding === building.building_code &&                        
                                    <BuildingContent>
                                        <ComponentContainerFilterItem onClick={() => setIsComponentsOpened(!isComponentsOpened)}>
                                            <ArrowIconContainer>
                                                {isComponentsOpened ? <AiOutlineDown /> : <MdOutlineArrowForwardIos />}
                                            </ArrowIconContainer>
                                            <Name>Components</Name>
                                        </ComponentContainerFilterItem>
                                        {isComponentsOpened &&
                                            <Components>
                                                {components.length > 0 ? components.map(component => (
                                                    <>
                                                        <NestedFilterItem key={component._id} selectedComponent={selectedComponent} currentComponent={component}>
                                                            <Name onClick={() => selectedComponentHandler(component._id)}>{`${component.component_code}`}</Name>
                                                        </NestedFilterItem>
                                                    </>
                                                )) : <NoCom>No Components to Show</NoCom>}
                                            </Components>
                                        }
                                        <ComponentContainerFilterItem>
                                            <ArrowIconContainer>
                                                <MdOutlineArrowForwardIos />
                                            </ArrowIconContainer>
                                            <Name>Rental Objects</Name>
                                        </ComponentContainerFilterItem>
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