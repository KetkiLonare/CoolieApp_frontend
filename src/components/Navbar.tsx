import React from "react";
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/icons/mitra-logo.svg"; // ← small logo (40x40 ideally)
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const links = [
    { path: "/", label: "Book", icon: "🛄" },
    { path: "/bookings", label: "My Bookings", icon: "📋" },
    { path: "/explorer", label: "Explore", icon: "🌏" },
    { path: "/translator", label: "Translator", icon: "🈯" },
  ];

  return (
    <>
      {/* 🌐 Desktop Navbar */}
      <BsNavbar expand="lg" className="custom-navbar d-none d-lg-flex">
        <Container className="d-flex align-items-center justify-content-between">
          <BsNavbar.Brand as={Link} to="/" className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold">
            <img src={logo} alt="Mitra Logo" className="navbar-logo" />
            <span>Mitra - AI Travel Assistant</span>
          </BsNavbar.Brand>

          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {links.map((link) => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  className={`nav-link-item text-white ${location.pathname === link.path ? "active fw-bold" : ""}`}
                >
                  {link.icon} {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

      {/* 📱 Mobile Bottom Navbar */}
      <div className="mobile-bottom-nav d-lg-none">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} className={`bottom-nav-link ${isActive ? "active" : ""}`}>
              <motion.div
                className="icon"
                animate={isActive ? { y: [-2, -8, 0] } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {link.icon}
              </motion.div>
              <span className="label">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
