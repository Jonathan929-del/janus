// Imports
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import {useEffect, useState} from 'react';


// Styles
const CreateActivityContainer = styled.aside`
    top:70px;
    z-index:3;
    width:20%;
    position:fixed;
    min-width:250px;
    max-width:300px;
    transition:0.2s linear;
    background-color:#fff;
    height:calc(100vh - 70px);
    border-left:2px solid #35c7FB;
    right:${({isActivityCreate}) => isActivityCreate ? '0' : '-100vh'};
`
const TopSection = styled.div`
    width:100%;
    color:#fff;
    display:flex;
    font-size:18px;
    padding:30px 0;
    align-items:center;
    justify-content:center;
    background-color:#35c7FB;
`
const MiddleSection = styled.div`
    width:90%;
    margin:auto;
`
const Item = styled.div`
    margin-top:20px;
`
const Label = styled.div`
    margin-bottom:10px;
`
const ActivityActionsContainer = styled.div`
    display:flex;
    max-width:230px;
    justify-content:space-between;
`
const ActivityAction = styled.button`
    color:#fff;
    outline:none;
    cursor:pointer;
    padding:7px 30px;
    border-radius:2px;
    border:1px solid #c3c3c3;
    background-color:${({activity, name}) => activity === name ? '#35c7FB' : '#ccc'};
`
const Input = styled.input`
    width:100%;
    border:none;
    outline:none;
    padding:7px 10px;
    background-color:#c3c3c3;
`
const BottomSection = styled.div`
    left:0;
    bottom:0;
    z-index:50;
    width:100%;
    display:flex;
    padding:10px 0;
    position:absolute;
    align-items:center;
    background-color:#c3c3c3;
    justify-content:space-evenly;
    border-top:1px solid #35c7FB;
`
const SaveButton = styled.button`
    border:none;
    outline:none;
    color:#fff;
    cursor:pointer;
    padding:7px 30px;
    border-radius:5px;
    background-color:#ED7D31;
`
const CancelButton = styled.button`
    border:none;
    outline:none;
    cursor:pointer;
    color:#ED7D31;
    padding:7px 30px;
    border-radius:5px;
    background-color:#fff;
    border:1px solid #ED7D31;
`


// Main Function
const CreateActivity = ({isActivityCreate, setIsActivityCreate, selectedComponent}) => {


    // Fetching user
    const [user, setUser] = useState('');
    const userFetcher = async () => {
        try {
            const res = await axios.get('https://janus-server-side.herokuapp.com/users');
            setUser(res.data[0].user);
        } catch (err) {
            console.log(err);
        }
    };


    // Posting activity
    const [input, setInput] = useState({});
    const activityPoster = async () => {
        try {
            await axios.post('https://janus-server-side.herokuapp.com/activities', input);
            setIsActivityCreate(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setInput({
            activity:'Tillsyn',
            date:new Date(),
            user,
            remark:'',
            component:selectedComponent.component_code,
            building:selectedComponent.building_code,
            property:selectedComponent.property_code
        });
        userFetcher();
    }, [isActivityCreate]);


    return (
        <CreateActivityContainer isActivityCreate={isActivityCreate}>
            <TopSection>Add new activity</TopSection>
            <MiddleSection>
                <Item>
                    <Label>Activity</Label>
                    <ActivityActionsContainer>
                        <ActivityAction onClick={() => setInput({...input, activity:'Tillsyn'})} activity={input.activity} name='Tillsyn'>Tillsyn</ActivityAction>
                        <ActivityAction onClick={() => setInput({...input, activity:'Skötsel'})} activity={input.activity} name='Skötsel'>Skötsel</ActivityAction>
                    </ActivityActionsContainer>
                </Item>
                <Item>
                    <Label>Date</Label>
                    <Input value={moment(new Date()).format('YYYY-MM-DD')} />
                </Item>
                <Item>
                    <Label>Signature</Label>
                    <Input value={user} />
                </Item>
                <Item>
                    <Label>Remark</Label>
                    <Input value={input.remark} onChange={e => setInput({...input, remark:e.target.value})}/>
                </Item>
            </MiddleSection>
            <BottomSection>
                <SaveButton onClick={activityPoster}>Save</SaveButton>
                <CancelButton onClick={() => setIsActivityCreate(false)}>Cancel</CancelButton>
            </BottomSection>
        </CreateActivityContainer>
    )
}


// Export
export default CreateActivity;