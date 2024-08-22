import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cardColor, setCardColor] = useState('');
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const translations = {
    en: {
      settings: 'Settings',
      updateEmail: 'Update Email',
      updatePassword: 'Update Password',
      oldEmail: 'Old Email',
      newEmail: 'New Email',
      currentEmail: 'Current Email',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      saveChanges: 'Save Changes',
      alertPasswordMismatch: 'New password and confirm password do not match',
      alertError: 'An error occurred',
      Customization: 'Customization',
      enterCustomization: 'Update Name, colors, and titles',
      Name: 'New Name',
      enterNewName: 'Enter New Name',
      cardColor: 'Cards Color',
      headerColor: 'Header Color',
      backgroundColor: 'Background Color',
      uploadLogo: 'Upload New Logo',
      title :"title"
    },
    ar: {
      settings: 'الإعدادات',
      updateEmail: 'تحديث البريد الإلكتروني',
      updatePassword: 'تحديث كلمة المرور',
      oldEmail: 'البريد الإلكتروني القديم',
      newEmail: 'البريد الإلكتروني الجديد',
      currentEmail: 'البريد الإلكتروني الحالي',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
      saveChanges: 'حفظ التغييرات',
      alertPasswordMismatch: 'كلمة المرور الجديدة وتأكيد كلمة المرور لا تتطابق',
      alertError: 'حدث خطأ',
      Customization: 'اعدادات التصميم',
      enterCustomization: 'عدل الاسم، الألوان، والعناوين',
      Name: 'اسم الموقع الجديد',
      enterNewName: 'أدخل الاسم الجديد',
      cardColor: 'لون البطاقات',
      headerColor: 'لون الرأس',
      backgroundColor: 'لون الخلفية',
      uploadLogo: 'رفع شعار جديد',
      title:"عنوان الصفحه الرئيسيه"
    }
  };

  const language = localStorage.getItem('language') || 'en';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedOption === 'Password') {
        if (newPassword !== confirmPassword) {
          alert(translations[language].alertPasswordMismatch);
          return;
        }

        const response = await axios.patch('http://localhost:3000/api/admin/update-password', {
          currentPassword,
          newPassword,
          currentEmail
        });

        alert(response.data.message);
      } else if (selectedOption === 'Email') {
        const response = await axios.patch('http://localhost:3000/api/admin/update-email', {
          oldEmail,
          newEmail,
          currentPassword,
          currentEmail
        });

        alert(response.data.message);
      } else if (selectedOption === 'custom') {
        const formData = new FormData();
        formData.append('cardColor', cardColor);
        formData.append('headerColor', headerColor);
        formData.append('backgroundColor', backgroundColor);
        if (logoFile) {
          formData.append('logo', logoFile);
        }

        const response = await axios.post('http://localhost:3000/api/admin/update-customization', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || translations[language].alertError);
    }
  };

  return (
    <div className="settings-container">
      <h1>{translations[language].settings}</h1>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className={`settings-card ${selectedOption === 'Email' ? 'selected' : ''}`} onClick={() => setSelectedOption('Email')}>
            <Card.Body>
              <Card.Title>{translations[language].updateEmail}</Card.Title>
              <Card.Text>{translations[language].newEmail}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className={`settings-card ${selectedOption === 'Password' ? 'selected' : ''}`} onClick={() => setSelectedOption('Password')}>
            <Card.Body>
              <Card.Title>{translations[language].updatePassword}</Card.Title>
              <Card.Text>{translations[language].newPassword}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className={`settings-card ${selectedOption === 'custom' ? 'selected' : ''}`} onClick={() => setSelectedOption('custom')}>
            <Card.Body>
              <Card.Title>{translations[language].Customization}</Card.Title>
              <Card.Text>{translations[language].enterCustomization}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedOption && (
        <Form onSubmit={handleSubmit} className="mt-4">
          {selectedOption === 'Email' && (
            <>
              <Form.Group controlId="formOldEmail" className="mb-3">
                <Form.Label>{translations[language].oldEmail}</Form.Label>
                <Form.Control
                  type="email"
                  value={oldEmail}
                  onChange={(e) => setOldEmail(e.target.value)}
                  placeholder={translations[language].enterOldEmail}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewEmail" className="mb-3">
                <Form.Label>{translations[language].newEmail}</Form.Label>
                <Form.Control
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={translations[language].enterNewEmail}
                  required
                />
              </Form.Group>
            </>
          )}

          {selectedOption === 'Password' && (
            <>
              <Form.Group controlId="formCurrentEmail" className="mb-3">
                <Form.Label>{translations[language].currentEmail}</Form.Label>
                <Form.Control
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  placeholder={translations[language].enterCurrentEmail}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label>{translations[language].currentPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={translations[language].enterCurrentPassword}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>{translations[language].newPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={translations[language].enterNewPassword}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>{translations[language].confirmNewPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={translations[language].confirmNewPasswordPlaceholder}
                  required
                />
              </Form.Group>
            </>
          )}

          {selectedOption === 'custom' && (
            <>
            
              <Form.Group controlId="formCardColor" className="mb-3">
                <Form.Label>{translations[language].cardColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={cardColor}
                  onChange={(e) => setCardColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formHeaderColor" className="mb-3">
                <Form.Label>{translations[language].headerColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={headerColor}
                  onChange={(e) => setHeaderColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBackgroundColor" className="mb-3">
                <Form.Label>{translations[language].backgroundColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formLogo" className="mb-3">
                <Form.Label>{translations[language].uploadLogo}</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  
                />
              </Form.Group>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>{translations[language].Name}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={translations[language].Name}
                />
              </Form.Group>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>{translations[language].title}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={translations[language].title}
                />
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit" className="mt-3">
            {translations[language].saveChanges}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Settings;
