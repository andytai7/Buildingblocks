import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const instance = axios.create({
  withCredentials: true
})

function EditBio() {
  //console.log(this.state);
  console.log(useSelector(state => state))
  const [open, setOpen] = React.useState(false)
  const [bio, setBio] = React.useState("")
  const [info, setInfo] = React.useState()

  const userid = useSelector(state => state._id)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  function onSubmit(e) {
    e.preventDefault();
    console.log("FRONTEND AUTH", token);
    const newBio = {
      bio: bio,
      club: ["neuroscience"],
      userRole: "Mentor",
    };

    const newInfo = {
      club: "neuroscience",
      userRole: "Mentor"
    };

    const authToken = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    setBio("");
    
    instance.post("http://localhost:5000/users/update/" + userid, newBio, authToken).then((res) => {
      if (res.data === "User updated!") {
        console.log(res.data);
        if (res.data.token) {
          dispatch({type: "CHANGE_TOKEN", token: res.data.token})
        }
        dispatch({type: "CHANGE_BIO", bio: bio})
        //dispatch({type: "CHANGE_CLUB_USERROLE", club: ["neuroscience"], userRole: "Mentor"})

      } else {
        // useAlert("Sorry, can you please try again?");
        console.log(res.data);
      }
    });
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ <div className="modifySelection">
      <b>Change Bio</b>
      <br />
      <br />
       A summary of yourself that will help others get to know you on BuildingBlocks
    </div>}
    >
      <Modal.Header>Change Bio</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {/* <Header>Enter new username</Header> */}
          <form onSubmit={onSubmit}>
            <input 
              type="text" 
              placeholder="New bio"
              name = "bio"
              required
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            /> 
          </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Return
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          onClick={onSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditBio