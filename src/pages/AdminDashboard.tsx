import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import api from "../api/axiosInstance";

interface Stats {
  totalBookings: number;
  activeHelpers: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get("/mock-admin-stats"); // Replace with real API
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        setStats({ totalBookings: 235, activeHelpers: 85, revenue: 125000 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Container className="py-4">
        <h2 className="mb-4 text-center text-primary">Admin Dashboard</h2>
        <Row className="g-4 justify-content-center">
          <Col xs={12} sm={6} md={4}>
            <Card className="shadow-sm p-4 text-center rounded-4">
              <h5>Total Bookings</h5>
              <span className="fw-bold fs-4">{stats.totalBookings}</span>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="shadow-sm p-4 text-center rounded-4">
              <h5>Active Helpers</h5>
              <span className="fw-bold fs-4">{stats.activeHelpers}</span>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="shadow-sm p-4 text-center rounded-4">
              <h5>Revenue</h5>
              <span className="fw-bold fs-4">₹{stats.revenue.toLocaleString()}</span>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
