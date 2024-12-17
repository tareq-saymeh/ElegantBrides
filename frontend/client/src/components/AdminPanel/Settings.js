import React, { useState, useEffect } from 'react';
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
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [arabicTitle, setArabicTitle] = useState('');
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
      customization: 'Customization',
      enterCustomization: 'Update Name, colors, and titles',
      name: 'New Name',
      enterNewName: 'Enter New Name',
      cardColor: 'Cards Color',
      headerColor: 'Header Color',
      backgroundColor: 'Background Color',
      uploadLogo: 'Upload New Logo',
      title: 'Page Title',
      arabicTitle: 'Arabic Page Title',
      webTitle: "Website Name"
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
      customization: 'اعدادات التصميم',
      enterCustomization: 'عدل الاسم، الألوان، والعناوين',
      name: 'اسم الموقع الجديد',
      enterNewName: 'أدخل الاسم الجديد',
      cardColor: 'لون البطاقات',
      headerColor: 'لون الرأس',
      backgroundColor: 'لون الخلفية',
      uploadLogo: 'رفع شعار جديد',
      title: 'عنوان الصفحة',
      arabicTitle: 'عنوان الصفحة بالعربية',
      webTitle: "اسم الموقع"
    },
  };

  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    // Fetch the existing customization settings when the component mounts
    const fetchCustomization = async () => {
      try {
        const response = await axios.get('/api/custom/get-customization');
        setArabicTitle(response.data.arabicTitle);
        setCardColor(response.data.cardColor);
        setHeaderColor(response.data.headerColor);
        setBackgroundColor(backgroundColor || '#C0C0C0');
      } catch (error) {
        console.error('Error fetching customization:', error.message);
        alert(translations[language].alertError);
      }
    };
    

    fetchCustomization();
  }, [language, translations]); // Include language and translations as dependencies for accurate updates

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
          currentEmail,
        });

        alert(response.data.message);
      } else if (selectedOption === 'Email') {
        const response = await axios.patch('http://localhost:3000/api/admin/update-email', {
          oldEmail,
          newEmail,
          currentPassword,
          currentEmail,
        });

        alert(response.data.message);
      } else if (selectedOption === 'custom') {
        const formData = new FormData();
        formData.append('cardColor', cardColor);
        formData.append('headerColor', headerColor);
        formData.append('backgroundColor', backgroundColor);
        formData.append('title', title);
        formData.append('name', name);
        formData.append('arabicTitle', arabicTitle);
        if (logoFile) {
          formData.append('logo', logoFile);
        }

        const response = await axios.post('http://localhost:3000/api/custom/update-customization', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
              <Card.Title>{translations[language].customization}</Card.Title>
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
                  placeholder={translations[language].oldEmail}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewEmail" className="mb-3">
                <Form.Label>{translations[language].newEmail}</Form.Label>
                <Form.Control
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={translations[language].newEmail}
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
                  placeholder={translations[language].currentEmail}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label>{translations[language].currentPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={translations[language].currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>{translations[language].newPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={translations[language].newPassword}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>{translations[language].confirmNewPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={translations[language].confirmNewPassword}
                  required
                />
              </Form.Group>
            </>
          )}

          {selectedOption === 'custom' && (
            <>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>{translations[language].name}</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={translations[language].enterNewName}
                />
              </Form.Group>
              
              <Form.Group controlId="formArabicTitle" className="mb-3">
                <Form.Label>{translations[language].arabicTitle}</Form.Label>
                <Form.Control
                  type="text"
                  value={arabicTitle}
                  onChange={(e) => setArabicTitle(e.target.value)}
                  placeholder={translations[language].arabicTitle}
                />
              </Form.Group>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>{translations[language].title}</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={translations[language].title}
                />
              </Form.Group>
              <Form.Group controlId="formCardColor" className="mb-3">
                <Form.Label>{translations[language].cardColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={cardColor}
                  onChange={(e) => setCardColor(e.target.value)}
                  placeholder={translations[language].cardColor}
                />
              </Form.Group>
              <Form.Group controlId="formHeaderColor" className="mb-3">
                <Form.Label>{translations[language].headerColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={headerColor}
                  onChange={(e) => setHeaderColor(e.target.value)}
                  placeholder={translations[language].headerColor}
                />
              </Form.Group>
              <Form.Group controlId="formBackgroundColor" className="mb-3">
                <Form.Label>{translations[language].backgroundColor}</Form.Label>
                <Form.Control
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  placeholder={translations[language].backgroundColor}
                />
              </Form.Group>
              <Form.Group controlId="formLogoFile" className="mb-3">
                <Form.Label>{translations[language].uploadLogo}</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                />
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            {translations[language].saveChanges}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Settings;
