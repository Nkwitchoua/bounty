import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateUser } from '../store/actions/usersActions';

const EditProfile = () => {

  const { currentUserData, currentUserDataLoading } = useSelector(state => state.authUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  let reader = new FileReader();
//   console.log(reader.readAsDataURL())

  const [form, setForm] = useState({
      name: "",
      surname: "",
      career: "",
      description: "",
      experience: "",
      links: [],
      photo: ""
  });

  const photoHandler = async(photo) => {
    let reader = new FileReader();
    await reader.readAsDataURL(photo);
    reader.onload = function() {
        let document = reader.result;
        setForm({
            ...form,
            photo: document
        })
    };
  };

  const formHandler = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    })
  };

  const linksHandler = (event, index) => {
    const linksList = [...form.links];
    linksList[index] = event.target.value;
    setForm({
        ...form,
        links: linksList
    })
  };

  useEffect(() => {
    if(currentUserData) {
        setForm(currentUserData)
    }
  }, [currentUserData])

  if(!currentUserData) {
      return (
          <Container>
              <Spinner animation='border'/>
          </Container>
      )
  };

  return (
    <Container className='my-3 my-sm-5'>
        <h2 className='my-5'>Edit your Profile</h2>
        <Form>
            <h5 className='my-3'>Full Name</h5>
            <div className='d-flex gap-3'>
                <div>
                    <h6>Name:</h6> 
                    <FormControl 
                        name="name"
                        value={form.name}
                        onChange={(event) => formHandler(event)}/>
                </div>
                <div>
                    <h6>Surname:</h6>
                    <FormControl 
                        name="surname"
                        value={form.surname}
                        onChange={(event) => formHandler(event)}/>
                </div>
            </div>
            <h5 className='my-3'>Your Career:</h5>
            <Form.Select
                    name="career"
                    value={form.career}
                    onChange={(event) => formHandler(event)}>
                <option value="Web Designer" >Web Designer</option>
                <option value="Frontend Developer" >Frontend Developer</option>
                <option value="Backend Developer" >Backend Developer</option>
                <option value="SMM Specialist" >SMM Specialist</option>
                <option value="Graphic Designer" >Graphic Designer</option>
                <option value="Writer" >Writer</option>
                <option value="Text Editor" >Text Editor</option>
            </Form.Select>
            <h5 className='my-3'>Your Experience</h5>
            <Form.Select 
                    name="experience"
                    value={form.experience}
                    onChange={(event) => formHandler(event)}>
                <option value="Less than 1 year" >Less than 1 year</option>
                <option value="More than 1 year" >More than 1 year</option>
                <option value="More than 3 years" >More than 3 years</option>
                <option value="More than 5 years" >More than 5 years</option>
            </Form.Select>
            <h5 className='my-3'>About You:</h5>
            <FormControl 
                name="description"
                value={form.description} 
                as="textarea" 
                rows={4}
                onChange={(event) => formHandler(event)}/>
            <h5 className='my-3'>Links to Social Media:</h5>
            <div className='d-flex flex-column gap-3'>
                {
                    form.links.map((link, index) => {
                        return (
                            <div key={index} className='d-flex gap-3 align-items-center'>
                                <h5>{index + 1}</h5>
                                <FormControl 
                                    name="links"
                                    value={form.links[index]} 
                                    onChange={(event) => linksHandler(event, index)}/>
                                <div
                                    className='hover-bg-light rounded-circle d-flex align-items-center justify-content-center'
                                    style={{width:"40px", height: "40px"}}
                                    onClick={() => {
                                        const list = [...form.links];
                                        list.splice(index, 1);
                                        setForm({
                                            ...form,
                                            links: list
                                        })
                                        }}>
                                    <RiDeleteBin6Line
                                        size={24}
                                        />
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    className='hover-bg-light rounded-circle d-flex align-items-center justify-content-center'
                    style={{width:"40px", height: "40px"}}
                    onClick={() => {
                        const list = [...form.links];
                        list.push("");
                        setForm({
                            ...form,
                            links: list
                        });
                    }}>
                    <IoIosAddCircleOutline size={30}/>
                </div>
            </div>
            <h5 className='my-5'>Add your Photo</h5>
            <FormControl 
                type='file'
                onChange={(event) => photoHandler(event.target.files[0])}/>
        </Form>
        <div className='d-flex gap-5 my-5'>
            <Button 
                style={{width: "120px"}} 
                variant='success' 
                onClick={() => {
                    dispatch(UpdateUser(params.userId, form));
                    navigate(-1);
                }}>Save</Button>
            <Button 
                style={{width: "120px"}} 
                variant='outline-warning'
                onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    </Container>
  )
};

export default EditProfile