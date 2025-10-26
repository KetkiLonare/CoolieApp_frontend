import React, { useState } from "react";
import { Container, Card, Row, Col, Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaGlobe, FaStar } from "react-icons/fa";
import axios from "axios";

import mumbaiImg from "../assets/images/mumbai.jpg";
import delhiImg from "../assets/images/delhi.jpg";
import bengaluruImg from "../assets/images/bengaluru.jpg";
import jaipurImg from "../assets/images/jaipur.jpg";
import kolkataImg from "../assets/images/kolkata.jpg";
import chennaiImg from "../assets/images/chennai.jpg";
import goaImg from "../assets/images/goa.jpg";

export const popularCities = [
  { city: "Mumbai", state: "Maharashtra", image: mumbaiImg },
  { city: "New Delhi", state: "Delhi", image: delhiImg },
  { city: "Bengaluru", state: "Karnataka", image: bengaluruImg },
  { city: "Jaipur", state: "Rajasthan", image: jaipurImg },
  { city: "Kolkata", state: "West Bengal", image: kolkataImg },
  { city: "Chennai", state: "Tamil Nadu", image: chennaiImg },
  { city: "Goa", state: "Goa", image: goaImg },
];

export default function TourismExplorer() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    passenger: "",
    service: "",
    luggage_weight: "",
    city: "",
    state: "",
    arrival_time: new Date().toISOString().slice(0, 16) // default current datetime
  });

  const handleOpenModal = (city: string, state: string) => {
    setSelectedCity(city);
    setForm({ ...form, city, state });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://coolieapp-backend.onrender.com/book", {
        name: form.passenger,
        city: form.city,
        luggage_weight: parseFloat(form.luggage_weight),
        arrival_time: form.arrival_time,
        service_type: form.service
      });
      alert(`Booking confirmed for ${res.data.city}! Assigned Helper: ${res.data.assigned_helper}`);
      setShowModal(false);
      setForm({
        passenger: "",
        service: "",
        luggage_weight: "",
        city: "",
        state: "",
        arrival_time: new Date().toISOString().slice(0, 16)
      });
    } catch (err: any) {
      alert("Error booking: " + err?.response?.data?.detail || err.message);
    }
    setLoading(false);
  };

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  return (
    <div className="tourism-bg py-5">
      <Container>
        <h2 className="text-center mb-4 fw-bold text-gradient">
          <FaGlobe /> Explore India
        </h2>
        <Row className="g-4">
          {popularCities.map((c, idx) => {
            const rating = getRandomRating();
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card className="shadow-lg h-100 tourism-card">
                  <div className="card-img-wrapper">
                    <Card.Img variant="top" src={c.image} className="card-img-top" />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold">{c.city}</Card.Title>
                      <Card.Text className="text-muted">{c.state}</Card.Text>
                      <div className="d-flex align-items-center">
                        {Array.from({ length: rating }).map((_, i) => (
                          <FaStar key={i} color="#FF9933" className="me-1" />
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                          <FaStar key={i} color="#ccc" className="me-1" />
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button
                        className="btn-tri px-3 py-1"
                        onClick={() => handleOpenModal(c.city, c.state)}
                      >
                        Book Coolie
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Booking Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Book Coolie Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Passenger Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={form.passenger}
                  onChange={(e) => setForm({ ...form, passenger: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={form.city} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  required
                >
                  <option value="">Select Service</option>
                  <option>Standard Luggage Help</option>
                  <option>VIP Porter Assistance</option>
                  <option>Tourist Companion</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Luggage Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter weight"
                  value={form.luggage_weight}
                  onChange={(e) => setForm({ ...form, luggage_weight: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={form.arrival_time}
                  onChange={(e) => setForm({ ...form, arrival_time: e.target.value })}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit" className="btn-tri px-4 py-2" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Confirm Booking"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
