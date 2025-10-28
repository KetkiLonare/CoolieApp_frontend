import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { FaSuitcase, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWallet, FaClock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import mumbaiImg from "../assets/images/mumbai.jpg";
import delhiImg from "../assets/images/delhi.jpg";
import bengaluruImg from "../assets/images/bengaluru.jpg";
import placeholderImg from "../assets/images/placeholder.png";
import { LocalBackend } from "../api/localbackend";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const cityImages: { [key: string]: string } = {
    Mumbai: mumbaiImg,
    "New Delhi": delhiImg,
    Bengaluru: bengaluruImg,
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("https://coolieg.onrender.com/bookings");
        setBookings(res.data?.bookings || []);
      } catch (err) {
        console.warn("API down, loading from local fallback...");
        const res = await LocalBackend.getBookings();
        setBookings(res.bookings);
        setError("Showing local stored bookings (API unreachable)");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  const handleViewDetails = (booking: any) => {
    navigate("/success", { state: booking });
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <h2 className="text-center mb-4 fw-bold text-gradient">📋 My Bookings</h2>
        <Row className="g-3">
          {bookings.length === 0 ? (
            <p className="text-center w-100">No bookings found.</p>
          ) : (
            bookings.map((booking, idx) => (
              <Col xs={12} md={6} lg={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                >
                  <Card className="shadow-lg p-3 h-100">
                    <Card.Img
                      variant="top"
                      src={booking.img || cityImages[booking.city] || placeholderImg}
                      style={{ height: "180px", objectFit: "cover", borderRadius: "0.5rem" }}
                    />
                    <Card.Body>
                      <Row>
                        <Col xs={12} className="mb-1">
                          <FaUser /> <strong>Passenger:</strong> {booking.name}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaMapMarkerAlt /> <strong>Location:</strong> {booking.city}, {booking.state}, {booking.country}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaSuitcase /> <strong>Service:</strong> {booking.service_type}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaSuitcase /> <strong>Luggage:</strong> {booking.luggage_weight} kg
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaCalendarAlt /> <strong>Arrival:</strong> {formatDateTime(booking.arrival_time)}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaUser /> <strong>Helper:</strong> {booking.helper}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaWallet /> <strong>Fare:</strong> ₹{booking.fare}
                        </Col>
                        <Col xs={12} className="mb-1">
                          <FaClock /> <strong>Booked At:</strong> {formatDateTime(booking.timestamp)}
                        </Col>
                      </Row>
                      <Button
                        className="btn-tri w-100 mt-2"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </motion.div>
  );
}
