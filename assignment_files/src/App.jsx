import React, { useEffect, useState } from 'react';
import './Form.css';

const Form = () => {
  const trigger = async (type) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": "Ayan",
      "email": "newayanahmad@gmail.com",
      "type": type
    });

    var requestOptions = {
      mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const r = await fetch("https://shuffler.io/api/v1/hooks/webhook_383b47f1-2ff5-48df-9f6a-d436a8f073b4", requestOptions)
  }

  useEffect(() => {
    trigger("opened")
  }, [])
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    date: '',
    tnc: false,
    adult: '',
    gender: '',
    desc: '',
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...formState,
      password: "********",
      "type": "submitted"
    });

    var requestOptions = {
      mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const r = await fetch("https://shuffler.io/api/v1/hooks/webhook_c99d2621-7c5b-4c30-b8a8-beb604c2fdb0", requestOptions)

    setFormState({
      name: '',
      email: '',
      password: '',
      number: '',
      date: '',
      tnc: false,
      adult: '',
      gender: '',
      desc: '',
    })
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 style={{ whiteSpace: 'nowrap' }}>Form + Shuffle</h2>
      <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Enter Password (any random)" onChange={handleChange} />
      <input type="number" name="number" placeholder="Enter Phone Number" onChange={handleChange} />
      <input type="date" name="date" placeholder='dd/mm/yyyy' style={{ width: "96%" }} onChange={handleChange} />
      <div style={{ width: "96%", display: 'flex', flexDirection: "column", alignItems: 'start' }}>
        <p style={{ margin: 0 }}>Are you adult? (Above 18 years)</p>
        <div>
          <input type="radio" name="adult" value="Yes" onChange={handleChange} />
          <label>Yes</label>
        </div>
        <div>
          <input type="radio" name="adult" value="No" onChange={handleChange} />
          <label>No</label>
        </div>
      </div>
      <select name="gender" onChange={handleChange}>
        <option defaultValue="" disabled selected>--Select Gender--</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
      <textarea name="desc" placeholder="Enter Text" onChange={handleChange} />
      <div>
        <input type="checkbox" name="checkbox" onChange={handleChange} />
        <label>I agree to the terms and conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
