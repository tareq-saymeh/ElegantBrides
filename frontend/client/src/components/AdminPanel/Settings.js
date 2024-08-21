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

  // Translation object
  const translations = {
    en: {
      settings: 'Settings',
      selectOption: 'Select Option to Update',
      updateEmail: 'Update Email',
      updatePassword: 'Update Password',
      oldEmail: 'Old Email',
      newEmail: 'New Email',
      currentEmail: 'Current Email',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      saveChanges: 'Save Changes',
      enterOldEmail: 'Enter old email',
      enterNewEmail: 'Enter new email',
      enterCurrentEmail: 'Enter current email',
      enterCurrentPassword: 'Enter current password',
      enterNewPassword: 'Enter new password',
      confirmNewPasswordPlaceholder: 'Confirm new password',
      alertPasswordMismatch: 'New password and confirm password do not match',
      alertError: 'An error occurred'
    },
    ar: {
      settings: 'الإعدادات',
      selectOption: 'اختر خيارًا للتحديث',
      updateEmail: 'تحديث البريد الإلكتروني',
      updatePassword: 'تحديث كلمة المرور',
      oldEmail: 'البريد الإلكتروني القديم',
      newEmail: 'البريد الإلكتروني الجديد',
      currentEmail: 'البريد الإلكتروني الحالي',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
      saveChanges: 'حفظ التغييرات',
      enterOldEmail: 'أدخل البريد الإلكتروني القديم',
      enterNewEmail: 'أدخل البريد الإلكتروني الجديد',
      enterCurrentEmail: 'أدخل البريد الإلكتروني الحالي',
      enterCurrentPassword: 'أدخل كلمة المرور الحالية',
      enterNewPassword: 'أدخل كلمة المرور الجديدة',
      confirmNewPasswordPlaceholder: 'تأكيد كلمة المرور الجديدة',
      alertPasswordMismatch: 'كلمة المرور الجديدة وتأكيد كلمة المرور لا تتطابق',
      alertError: 'حدث خطأ'
    }
  };

  const language = localStorage.getItem('language') || 'ar'; // Default to English

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
          alert(translations[language].alertPasswordMismatch);
          return;
        }

        // Make API call to update password
        const response = await axios.patch('http://localhost:3000/api/admin/update-password', {
          currentPassword,
          newPassword,
          CurrentEmail
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
      alert(error.response?.data?.message || translations[language].alertError);
    }
  };

  return (
    <div>
      <h1>{translations[language].settings}</h1>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedOption ? `${translations[language].updateEmail} / ${translations[language].updatePassword}` : translations[language].selectOption}
        onSelect={handleOptionSelect}
        className="mb-3"
      >
        <Dropdown.Item eventKey="Email">{translations[language].updateEmail}</Dropdown.Item>
        <Dropdown.Item eventKey="Password">{translations[language].updatePassword}</Dropdown.Item>
      </DropdownButton>

      {selectedOption && (
        <div className='AdminSettingForm'>
          <Form onSubmit={handleSubmit}>
            {selectedOption === 'Email' && (
              <>
                <Form.Group controlId="formOldEmail" className='AdminFormContant'>
                  <Form.Label>{translations[language].oldEmail}</Form.Label>
                  <Form.Control
                    type="email"
                    value={oldEmail}
                    onChange={handleOldEmailChange}
                    placeholder={translations[language].enterOldEmail}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewEmail" className='AdminFormContant'>
                  <Form.Label>{translations[language].newEmail}</Form.Label>
                  <Form.Control
                    type="email"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    placeholder={translations[language].enterNewEmail}
                    required
                  />
                </Form.Group>
              </>
            )}

            {selectedOption === 'Password' && (
              <>
                <Form.Group controlId="formCurrentEmail" className='AdminFormContant'>
                  <Form.Label>{translations[language].currentEmail}</Form.Label>
                  <Form.Control
                    type="email"
                    value={CurrentEmail}
                    onChange={handlesetCurrentEmailChange}
                    placeholder={translations[language].enterCurrentEmail}
                    required
                  />
                  <Form.Label>{translations[language].currentPassword}</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder={translations[language].enterCurrentPassword}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className='AdminFormContant'>
                  <Form.Label>{translations[language].newPassword}</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder={translations[language].enterNewPassword}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className='AdminFormContant'>
                  <Form.Label>{translations[language].confirmNewPassword}</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder={translations[language].confirmNewPasswordPlaceholder}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit" className='AdminFormContant'>
              {translations[language].saveChanges}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Settings;
