import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
  <>
    <footer className="text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left text-black">
            <p className="mb-0">&copy; 2024 Elegant Brides</p>
            <p className="mb-0">Your dream bridal gown awaits you!</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <a href="#" className="text-black mx-2" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-black mx-2" aria-label="WhatsApp">
              <FaWhatsapp size={24} />
            </a>
            <a href="#" className="text-black mx-2" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
  );
}

export default Footer;
