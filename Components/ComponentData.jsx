// Imports
import axios from 'axios';
import moment from 'moment';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {AiOutlineDown} from 'react-icons/ai';
import CreateActivity from './CreateActivity';


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
    align-items:flex-start;
    justify-content:space-between;
`
const ComponentName = styled.p`
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
    font-size:12px;
    padding:10px 5px;
    border-bottom:1px solid #000;

    @media screen and (max-width:1100px){
        font-size:13px;
        padding:7px 5px;
    }
`
const LastAction = styled.div`
    padding:5px;
    font-size:12px;
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
    max-width:1000px;
    max-height:800px;
    padding:10px 10px 10px 0;
    grid-template-rows:${({isComponentUpdate}) => isComponentUpdate ? 'repeat(4, 1fr)' : 'repeat(6, 1fr)'};
    grid-template-columns:${({isComponentUpdate}) => isComponentUpdate ? 'repeat(2, 1fr)' : 'repeat(20, 1fr)'};
    grid-template-areas:${({isComponentUpdate}) => isComponentUpdate ?
                        `'componentCode name'
                        'systemCode location'
                        'contract responsibleUser'
                        'buttons buttons'`
                        :
                        `'componentCode componentCode componentCode componentCode name name name name systemCode systemCode systemCode systemCode activities activities activities activities activities activities activities activities'
                        'location location location location contract contract contract contract responsibleUser responsibleUser responsibleUser responsibleUser activities activities activities activities activities activities activities activities'
                        'attendance attendance attendance attendance attendance maintenance maintenance maintenance maintenance maintenance cleaning cleaning cleaning cleaning cleaning inspection inspection inspection inspection inspection'
                        'attendance attendance attendance attendance attendance maintenance maintenance maintenance maintenance maintenance cleaning cleaning cleaning cleaning cleaning inspection inspection inspection inspection inspection'
                        'attendance attendance attendance attendance attendance maintenance maintenance maintenance maintenance maintenance cleaning cleaning cleaning cleaning cleaning inspection inspection inspection inspection inspection'
                        'attendance attendance attendance attendance attendance maintenance maintenance maintenance maintenance maintenance cleaning cleaning cleaning cleaning cleaning inspection inspection inspection inspection inspection'`};

    @media screen and (max-width:768px){
        height:100vh;
        grid-template-rows:repeat(8, 1fr);
        grid-template-columns:repeat(12, 1fr);
        grid-template-areas:'componentCode componentCode componentCode componentCode name name name name systemCode systemCode systemCode systemCode'
                        'location location location location contract contract contract contract responsibleUser responsibleUser responsibleUser responsibleUser'
                        'activities activities activities activities activities activities activities activities activities activities activities activities'
                        'activities activities activities activities activities activities activities activities activities activities activities activities'
                        'attendance attendance attendance maintenance maintenance maintenance cleaning cleaning cleaning inspection inspection inspection'
                        'attendance attendance attendance maintenance maintenance maintenance cleaning cleaning cleaning inspection inspection inspection'
                        'attendance attendance attendance maintenance maintenance maintenance cleaning cleaning cleaning inspection inspection inspection'
                        'attendance attendance attendance maintenance maintenance maintenance cleaning cleaning cleaning inspection inspection inspection';
    }
`
const ComponentCode = styled.div`
    grid-area:componentCode;
`
const Name = styled.div`
    grid-area:name;
`
const SystemCode = styled.div`
    grid-area:systemCode;
`
const Location = styled.div`
    grid-area:location;
`
const Contract = styled.div`
    grid-area:contract;
`
const ResponsibleUser = styled.div`
    grid-area:responsibleUser;
`
const Activites = styled.div`
    max-height:150px;
    grid-area:activities;

    @media screen and (max-width:768px){
        max-height:unset;
    }
`
const Attendance = styled.div`
    border-radius:5px;
    grid-area:attendance;
    border:1px dashed #ccc;
`
const Maintenance = styled.div`
    border-radius:5px;
    grid-area:maintenance;
    border:1px dashed #ccc;
`
const Cleaning = styled.div`
    border-radius:5px;
    grid-area:cleaning;
    border:1px dashed #ccc;
`
const Inspection = styled.div`
    border-radius:5px;
    grid-area:inspection;
    border:1px dashed #ccc;
`
const Label = styled.p`
    font-size:15px;
    margin-bottom:10px;

    @media screen and (max-width:992px){
        font-size:10px;
    }
`
const ListLabel = styled.p`
    font-size:15px;
    margin-bottom:10px;
    padding:5px 0 0 10px;
    text-decoration:underline;

    @media screen and (max-width:992px){
        font-size:12px;
    }

    @media screen and (max-width:768px){
        font-size:10px;
        padding:2px 0 0 0;
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
    width:100%;
    border:none;
    padding:10px;
    outline:none;
    font-size:14px;
    border-radius:5px;
    background-color:#c3c3c3;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const ActivitesValue = styled.div`
    height:90%;
    width:100%;
    padding:10px;
    font-size:14px;
    overflow-y:scroll;
    border-radius:5px;
    background-color:#c3c3c3;

    &::-webkit-scrollbar{
        width:5px;
        border:1px solid #000;
    }
    &::-webkit-scrollbar-thumb{
        border-radius:5px;
        background-color:#000;
    }

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const ActivityItem = styled.p`
    font-size:12px;
`
const ListValue = styled.div`
    height:100%;
    padding:10px;
    display:flex;
    font-size:14px;
    border-radius:5px;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-start;

    @media screen and (max-width:992px){
        font-size:12px;
    }
`
const Activity = styled.div`
    width:100%;
    display:flex;
    cursor:pointer;
    padding-top:5px;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid #000;
    color:${({selectedActivity, currentActivity}) => selectedActivity._id && selectedActivity._id === currentActivity._id ? '#fff' : ''};
    background-color:${({selectedActivity, currentActivity}) => selectedActivity._id && selectedActivity._id === currentActivity._id ? '#35c7FB' : ''};
`
const LastItem = styled.div`
    width:100%;
    margin-top:10px;
`
const ItemHeading = styled.h4`

`
const ItemValue = styled.p`
    display:flex;
    min-height:30px;
    padding-left:10px;
    border-radius:5px;
    align-items:center;
    background-color:#c3c3c3;
    justify-content:flex-start;
`
const Buttons = styled.div`
    width:100%;
    display:flex;
    height:40px;
    max-width:180px;
    grid-area:buttons;
    justify-content:space-between;
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
    border-radius:5px;
    transition:0.1s linear;
    background-color:#c3c3c3;

    &:hover{
        opacity:0.8;
    }
`


// Main Function
const ComponentData = ({selectedComponent, setSelectedComponent, isComponentUpdate, setIsComponentUpdate, selectedBuildingHandler}) => {


    // Actions opener
    const [isActionsOpened, setIsActionsOpened] = useState(false);
    const actionsToggler = () => {
        setIsActionsOpened(!isActionsOpened);
    };


    // Component activities
    const [activities, setActivities] = useState([{}]);
    const activitiesFetcher = async () => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/activities/${selectedComponent.component_code}`);
            setActivities(res.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }));
        } catch (err) {
            console.log(err);
        }
    };


    // Delete handler
    const deleteHandler = async () => {
        try {
            await axios.delete(`https://janus-server-side.herokuapp.com/components/${selectedComponent._id}`);
            Cookie.remove('component');
            setSelectedComponent({});
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }


    // Update handler
    const [input, setInput] = useState({});
    const updateInitializer = () => {
        setIsActionsOpened(false);
        setIsComponentUpdate(true);
    }
    const updateHandler = async () => {
        try {
            const res = await axios.put(`https://janus-server-side.herokuapp.com/components/${selectedComponent._id}`, input);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setInput({
            component_code:selectedComponent.component_code || '-',
            name:selectedComponent.name || '-',
            u_System:selectedComponent.u_System || '-',
            position_of_code:selectedComponent.position_of_code || '-',
            contracted:selectedComponent.contracted || '-',
            responsible_user:selectedComponent.responsible_user || '-'
        });
        activitiesFetcher();
    }, [selectedComponent]);


    // Back button handler
    const backButtonHandler = async () => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/buildings/building-code/${selectedComponent.building_code}`);
            selectedBuildingHandler(res.data._id);
        } catch (err) {
            console.log(err);
        }
    };


    // Selecting activity
    const [selectedActivity, setSelectedActivity] = useState({});
    const selectedActivityHandler = async id => {
        try {
            const res = await axios.get(`https://janus-server-side.herokuapp.com/activities/activity/${id}`);
            setSelectedActivity(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    // Deleting activity
    const activityDeleteHandler = async id => {
        try {
            id && await axios.delete(`https://janus-server-side.herokuapp.com/activities/${id}`);
            id && window.location.reload();
            setIsActionsOpened(false);
        } catch (err) {
            console.log(err);
        }
    };


    // Adding activity
    const [isActivityCreate, setIsActivityCreate] = useState(false);
    const activityCreateInitializer = () => {
        setIsActivityCreate(true);
        setIsActionsOpened(false);
    };


    return (
        <MainContainer>
            <CreateActivity
                isActivityCreate={isActivityCreate}
                setIsActivityCreate={setIsActivityCreate}
                selectedComponent={selectedComponent}
            />
            <TopSection>
                <TopTopSection>
                    <BackButton onClick={backButtonHandler}>Back to building</BackButton>
                    <ComponentName>{`${selectedComponent.component_code}`}</ComponentName>
                    <ActionsButtonContainer>
                        <ActionsButton onClick={actionsToggler}>
                            <ActionsButtonText>Actions</ActionsButtonText>
                            <ActionsButtonIconContainer>
                                <AiOutlineDown />
                            </ActionsButtonIconContainer>
                        </ActionsButton>
                        <ButtonContent isActionsOpened={isActionsOpened}>
                            <Action>Add new component</Action>
                            <Action onClick={updateInitializer}>Modify component</Action>
                            <Action onClick={deleteHandler}>Delete component</Action>
                            <Action onClick={activityCreateInitializer}>Add new activity</Action>
                            <Action>Modify selected activity</Action>
                            <LastAction onClick={() => activityDeleteHandler(selectedActivity._id)}>Delete selected activity</LastAction>
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
            <BottomSection isComponentUpdate={isComponentUpdate}>
                <ComponentCode>
                    <Label>Component Code</Label>
                    {isComponentUpdate ? <InputValue value={input.component_code} onChange={e => setInput({...input, component_code:e.target.value})}/> : <Value>{selectedComponent.component_code || '-'}</Value>}
                </ComponentCode>
                <Name>
                    <Label>Name</Label>
                    {isComponentUpdate ? <InputValue value={input.name} onChange={e => setInput({...input, name:e.target.value})}/> : <Value>{selectedComponent.name || '-'}</Value>}
                </Name>
                <SystemCode>
                    <Label>System Code</Label>
                    {isComponentUpdate ? <InputValue value={input.u_System} onChange={e => setInput({...input, u_System:e.target.value})}/> : <Value>{selectedComponent.u_System || '-'}</Value>}
                </SystemCode>
                <Location>
                    <Label>Location</Label>
                    {isComponentUpdate ? <InputValue value={input.position_of_code} onChange={e => setInput({...input, position_of_code:e.target.value})}/> : <Value>{selectedComponent.position_of_code || '-'}</Value>}
                </Location>
                <Contract>
                    <Label>Contract</Label>
                    {isComponentUpdate ? <InputValue value={input.contracted} onChange={e => setInput({...input, contracted:e.target.value})}/> : <Value>{selectedComponent.contracted || '-'}</Value>}
                </Contract>
                <ResponsibleUser>
                    <Label>Responsible User</Label>
                    {isComponentUpdate ? <InputValue value={input.responsible_user} onChange={e => setInput({...input, responsible_user:e.target.value})}/> : <Value>{selectedComponent.responsible_user || '-'}</Value>}
                </ResponsibleUser>
                {!isComponentUpdate ?
                    <>
                        <Activites>
                            <Label>Activites</Label>
                            <ActivitesValue>{activities.map(activity =>
                                <Activity onClick={() => selectedActivityHandler(activity._id)} selectedActivity={selectedActivity} currentActivity={activity}>
                                    <ActivityItem>{moment(activity.date).format('YYYY-MM-DD')}</ActivityItem>
                                    <ActivityItem>{activity.activity || '-'}</ActivityItem>
                                </Activity>
                            )}</ActivitesValue>
                        </Activites>
                        <Attendance>
                            <ListLabel>Attendance</ListLabel>
                            <ListValue>
                                <LastItem>
                                    <ItemHeading>Last</ItemHeading>
                                    <ItemValue>{selectedComponent.attendance_latest_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Interval</ItemHeading>
                                    <ItemValue>{selectedComponent.attendance_interval || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Next</ItemHeading>
                                    <ItemValue>{selectedComponent.attendance_next_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Text</ItemHeading>
                                    <ItemValue>{selectedComponent.attendance_text || '-'}</ItemValue>
                                </LastItem>
                            </ListValue>
                        </Attendance>
                        <Maintenance>
                            <ListLabel>Maintenance</ListLabel>
                            <ListValue>
                                <LastItem>
                                    <ItemHeading>Last</ItemHeading>
                                    <ItemValue>{selectedComponent.maintenance_latest_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Interval</ItemHeading>
                                    <ItemValue>{selectedComponent.maintenance_interval || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Next</ItemHeading>
                                    <ItemValue>{selectedComponent.maintenance_next_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Text</ItemHeading>
                                    <ItemValue>{selectedComponent.maintenance_text || '-'}</ItemValue>
                                </LastItem>
                            </ListValue>
                        </Maintenance>
                        <Cleaning>
                            <ListLabel>Cleaning</ListLabel>
                            <ListValue>
                                <LastItem>
                                    <ItemHeading>Last</ItemHeading>
                                    <ItemValue>{selectedComponent.other_latest_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Interval</ItemHeading>
                                    <ItemValue>{selectedComponent.other_interval || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Next</ItemHeading>
                                    <ItemValue>{selectedComponent.other_next_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Text</ItemHeading>
                                    <ItemValue>{selectedComponent.other_text || '-'}</ItemValue>
                                </LastItem>
                            </ListValue>
                        </Cleaning>
                        <Inspection>
                            <ListLabel>Inspection</ListLabel>
                            <ListValue>
                                <LastItem>
                                    <ItemHeading>Last</ItemHeading>
                                    <ItemValue>{selectedComponent.inspection_latest || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Interval</ItemHeading>
                                    <ItemValue>{selectedComponent.inspection_interval || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Next</ItemHeading>
                                    <ItemValue>{selectedComponent.inspection_next_date || '-'}</ItemValue>
                                </LastItem>
                                <LastItem>
                                    <ItemHeading>Type</ItemHeading>
                                    <ItemValue>{selectedComponent.inspection_type || '-'}</ItemValue>
                                </LastItem>
                            </ListValue>
                        </Inspection>
                    </> :
                        <Buttons>
                            <UpdateButton onClick={updateHandler}>Update</UpdateButton>
                            <CloseButton onClick={() => setIsComponentUpdate(false)}>Cancel</CloseButton>
                        </Buttons>
                }
            </BottomSection>
        </MainContainer>
    )
}


// Export
export default ComponentData;