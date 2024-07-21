import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    // Add logic to handle email and password change
    console.log({ email, currentPassword, newPassword });
    alert("Settings updated successfully!");
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className='AdminSettingForm'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className='AdminFormContant'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter new email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formCurrentPassword"  className='AdminFormContant'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Enter current password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword"  className='AdminFormContant'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword"  className='AdminFormContant'>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit"  className='AdminFormContant'>
          Save Changes
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default Settings;
