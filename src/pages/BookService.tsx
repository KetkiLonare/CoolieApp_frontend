import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import LocationSelector from "./LocationSelector";
import { useNavigate } from "react-router-dom";
import passengerIcon from "../assets/icons/passenger.svg";
import luggageIcon from "../assets/icons/luggage.svg";
import serviceIcon from "../assets/icons/service.svg";
import travelHint from "../assets/images/coolie.png";
import axios from "axios";
import "./BookService.css";
import { LocalBackend } from "../api/localbackend";

const BookService: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    passenger: "",
    service: "",
    luggage_weight: "",
    state: "",
    city: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const bookingData = {
      state: form.state,
      name: form.passenger,
      city: form.city,
      luggage_weight: parseFloat(form.luggage_weight),
      arrival_time: new Date().toISOString(),
      service_type: form.service,
    };

    try {
      const res = await axios.post(
        "https://coolieg.onrender.com/book",
        bookingData
      );
      setLoading(false);
      navigate("/success", { state: res.data });
    } catch (err) {
      console.warn("API not reachable. Using local backend fallback...");
      const res = await LocalBackend.book(bookingData);
      setLoading(false);
      setError("Backend offline — data stored locally");
      navigate("/success", { state: res });
    }
  };

  return (
    <div className="bookservice-bg position-relative">
      {/* Background overlay */}
      <div className="vikasit-bharat-bg"></div>

      {/* Tricolor Particles */}
      <div className="tricolor-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="particle" style={{ "--i": i } as React.CSSProperties}></span>
        ))}
      </div>

      <Container className="py-5 d-flex justify-content-center align-items-center flex-column position-relative">
        <Card className="booking-card shadow-lg p-4 w-100">
          {/* Heading */}
          <h2 className="text-center mb-4 fw-bold text-gradient">
            🇮🇳 Book Your Coolie Service
          </h2>

          {/* Logo */}
          <div className="text-center mb-4">
            <img src={travelHint} alt="Travel Hint Logo" className="hint-logo" />
          </div>

          {/* Error Alert */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="booking-form">
            {/* Passenger Name */}
            <Form.Group className="mb-3">
              <Form.Label>Passenger Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <img src={passengerIcon} alt="Passenger" className="icon-small" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter Passenger Name"
                  value={form.passenger}
                  onChange={(e) => setForm({ ...form, passenger: e.target.value })}
                  required
                />
              </InputGroup>
            </Form.Group>

            {/* Location */}
            <LocationSelector
              onLocationChange={(state, city) => setForm({ ...form, state, city })}
            />

            <Row className="mb-3">
              {/* Service Type */}
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label>Service Type</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <img src={serviceIcon} alt="Service" className="icon-small" />
                    </InputGroup.Text>
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
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Luggage Weight */}
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Luggage Weight (kg)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <img src={luggageIcon} alt="Luggage" className="icon-small" />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Enter Weight"
                      value={form.luggage_weight}
                      onChange={(e) => setForm({ ...form, luggage_weight: e.target.value })}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button variant="success" type="submit" className="btn-tri px-4 py-2 w-100 w-md-auto">
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default BookService;

