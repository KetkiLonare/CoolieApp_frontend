import React from "react";
import { Container } from "react-bootstrap";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <p>Empowering Viksit Bharat — Connecting Every Journey with Mitra 🇮🇳</p>
        <div className="social-icons mt-2">
          <a href="#" className="text-white me-3"><FaInstagram /></a>
          <a href="#" className="text-white me-3"><FaLinkedin /></a>
          <a href="#" className="text-white"><FaTwitter /></a>
        </div>
      </Container>
    </footer>
  );
}
