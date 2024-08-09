import React, { useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [CurrentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOptionSelect = (option) => setSelectedOption(option);
  const handleOldEmailChange = (e) => setOldEmail(e.target.value);
  const handleNewEmailChange = (e) => setNewEmail(e.target.value);
  const handlesetCurrentEmailChange = (e) => setCurrentEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedOption === 'Password') {
        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match");
          return;
        }

        // Make API call to update password
        const response = await axios.patch('http://localhost:3000/api/admin/update-password', {
          currentPassword,
          newPassword,CurrentEmail
        });

        alert(response.data.message);
      } else if (selectedOption === 'Email') {
        // Make API call to update email
        const response = await axios.patch('http://localhost:3000/api/admin/update-email', {
          oldEmail,
          newEmail,
          currentPassword,
          CurrentEmail
        });

        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedOption ? `Update ${selectedOption}` : "Select Option to Update"}
        onSelect={handleOptionSelect}
        className="mb-3"
      >
        <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
        <Dropdown.Item eventKey="Password">Password</Dropdown.Item>
      </DropdownButton>

      {selectedOption && (
        <div className='AdminSettingForm'>
          <Form onSubmit={handleSubmit}>
            {selectedOption === 'Email' && (
              <>
                <Form.Group controlId="formOldEmail" className='AdminFormContant'>
                  <Form.Label>Old Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={oldEmail}
                    onChange={handleOldEmailChange}
                    placeholder="Enter old email"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewEmail" className='AdminFormContant'>
                  <Form.Label>New Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    placeholder="Enter new email"
                    required
                  />
                </Form.Group>
              </>
            )}

            {selectedOption === 'Password' && (
              <>
              
                <Form.Group controlId="formCurrentPassword" className='AdminFormContant'>
                  <Form.Label>Current Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={CurrentEmail}
                    onChange={handlesetCurrentEmailChange}
                    placeholder="Enter old email"
                    required
                  />
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className='AdminFormContant'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className='AdminFormContant'>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit" className='AdminFormContant'>
              Save Changes
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Settings;
