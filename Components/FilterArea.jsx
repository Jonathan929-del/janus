// Imports
import styled from 'styled-components';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
import {AiOutlineBackward, AiOutlineDown} from 'react-icons/ai';


// Styles
const FilterContainer = styled.div`
    height:80%;
    width:100%;
    display:flex;
    flex-direction:column;
    border:2px solid #ccc;
    background-color:#fff;
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
    font-size:14px;
    color:#5c5c5c;
    font-weight:500;
    margin-left:10px;
`


// Main Function
const FilterArea = ({filterToggler, properties, propertyContentOpener, openedProperty, buildings, buildingContentOpener, openedBuilding, setIsComponentsOpened, isComponentsOpened, components, componentContentOpener, activities, openedComponent}) => {
  return (
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
  )
}


// Export
export default FilterArea;