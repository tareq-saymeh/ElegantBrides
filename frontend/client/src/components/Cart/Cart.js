import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setRedirect(true);
                    return;
                }

                const response = await fetch('http://localhost:3000/api/cart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setCart(data);
                } else {
                    // Handle errors like token expiry
                    setRedirect(true);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                setRedirect(true);
            }
        };

        fetchCart();
    }, []);

    if (redirect) return <Navigate to="/Login" />;
    if (!cart) return <div>Loading...</div>;

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                    Shopping Cart
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted">
                                                    {cart.itemId.length} items
                                                </MDBTypography>
                                            </div>
                                            <hr className="my-4" />
                                            {cart.itemId.map((item, index) => (
                                                <MDBRow key={index} className="mb-4 d-flex justify-content-between align-items-center">
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage
                                                            src={`http://localhost:3000/${item.image}`}
                                                            fluid className="rounded-3" alt={item.name} />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">
                                                            {item.category}
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            {item.name}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3" className="text-end">
                                                        <MDBTypography tag="h6" className="mb-0">
                                                            ILS {item.price}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                        <a href="#!" className="text-muted">
                                                            <MDBIcon fas icon="times" />
                                                        </a>
                                                    </MDBCol>
                                                </MDBRow>
                                            ))}
                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="#!" className="text-body">
                                                        <Link to="/">
                                                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to shop
                                                        </Link>
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="4" className="bg-grey">
                                        <div className="p-5">
                                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </MDBTypography>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    items {cart.itemId.length}
                                                </MDBTypography>
                                                <MDBTypography tag="h5">ILS {cart.itemId.reduce((total, item) => total + item.price, 0)}</MDBTypography>
                                            </div>
                                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                Shipping
                                            </MDBTypography>
                                            <div className="mb-4 pb-2">
                                                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                                                    <option value="1">Take From Store</option>
                                                    <option value="2">Delivery</option>
                                                </select>
                                            </div>
                                            
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography tag="h5">ILS {cart.itemId.reduce((total, item) => total + item.price, 0)}</MDBTypography>
                                            </div>
                                            <MDBBtn color="dark" block size="lg">
                                                Register
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
