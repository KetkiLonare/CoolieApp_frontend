// import React, { useState, useEffect } from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";
// import { FaCheckCircle, FaSuitcase, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWallet, FaClock } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";
// import "./SuccessPage.css";

// export default function Success() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const booking = location.state;

//     const [showConfetti, setShowConfetti] = useState(true);
//     const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
//     // Format function
//     const formatDate = (dateStr: any) => {
//         if (!dateStr) return "-";
//         const date = new Date(dateStr);
//         return date.toLocaleDateString("en-GB"); // dd/mm/yyyy format
//     };

//     // Format date and time as dd-mm-yyyy hh:mm
//     const formatDateTime = (dateStr: any) => {
//         if (!dateStr) return "-";
//         const date = new Date(dateStr);
//         const options = {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false, // 24-hour format
//         };
//         return date.toLocaleString("en-GB", options).replace(",", "");
//     };


//     useEffect(() => {
//         const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         const timer = setTimeout(() => setShowConfetti(false), 4000);
//         return () => clearTimeout(timer);
//     }, []);

//     if (!booking) {
//         return (
//             <Container className="text-center py-5">
//                 <h3>No booking found!</h3>
//                 <Button onClick={() => navigate("/")}>Go Back</Button>
//             </Container>
//         );
//     }

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="success-page"
//         >
//             {showConfetti && (
//                 <Confetti
//                     width={dimensions.width}
//                     height={dimensions.height}
//                     numberOfPieces={300}
//                     recycle={false}
//                 />
//             )}

//             <Container className="d-flex flex-column align-items-center justify-content-center h-100">
//                 {/* Success Icon */}
//                 <motion.div
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ type: "spring", stiffness: 260, damping: 20 }}
//                     className="text-center mb-4"
//                 >
//                     <FaCheckCircle size={80} color="#28a745" />
//                     <h2 className="mt-3 text-success">Booking Confirmed!</h2>
//                 </motion.div>

//                 {/* Booking Card */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
//                     className="w-100 d-flex justify-content-center"
//                 >
//                     <Card className="shadow-lg p-3 success-card">
//                         {booking.img && (
//                             <Card.Img
//                                 variant="top"
//                                 src={booking.img}
//                                 className="card-img-top"
//                             />
//                         )}
//                         <Card.Body>
//                             <Row>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaUser /> <strong>Passenger:</strong> {booking.passenger}
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaMapMarkerAlt /> <strong>State/City:</strong> {booking.state}, {booking.city}
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaSuitcase /> <strong>Service:</strong> {booking.service}
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaSuitcase /> <strong>Luggage:</strong> {booking.luggage} kg
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaCalendarAlt /> <strong>Arrival:</strong> {formatDateTime(booking.arrival)}
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaUser /> <strong>Helper:</strong> {booking.helper}
//                                 </Col>
//                                 <Col xs={12} md={6} className="mb-2">
//                                     <FaWallet /> <strong>Fare:</strong> ₹{booking.fare}
//                                 </Col>
//                                <Col xs={12} md={6} className="mb-2">
//     <FaClock /> <strong>Booked At:</strong> {formatDateTime(booking.timestamp)}
// </Col>s
//                             </Row>
//                         </Card.Body>
//                     </Card>
//                 </motion.div>

//                 {/* Back Button */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     className="mt-4"
//                 >
//                     <Button onClick={() => navigate("/")} className="btn-tri">
//                         Back to Home
//                     </Button>
//                 </motion.div>
//             </Container>
//         </motion.div>
//     );
// }
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle, FaSuitcase, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWallet, FaClock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./SuccessPage.css";

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    const [showConfetti, setShowConfetti] = useState(true);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!booking) {
        return (
            <Container className="text-center py-5">
                <h3>No booking found!</h3>
                <Button onClick={() => navigate("/")}>Go Back</Button>
            </Container>
        );
    }

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="success-page"
        >
            {showConfetti && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={300}
                    recycle={false}
                />
            )}

            <Container className="d-flex flex-column align-items-center justify-content-center h-100">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="text-center mb-4"
                >
                    <FaCheckCircle size={80} color="#28a745" />
                    <h2 className="mt-3 text-success">Booking Confirmed!</h2>
                </motion.div>

                {/* Booking Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="w-100 d-flex justify-content-center"
                >
                    <Card className="shadow-lg p-3 success-card">
                        {booking.img && <Card.Img variant="top" src={booking.img} className="card-img-top" />}
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaUser /> <strong>Passenger:</strong> {booking.name}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaMapMarkerAlt /> <strong>Location:</strong> {booking.city}, {booking.state}, {booking.country}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaSuitcase /> <strong>Service:</strong> {booking.service_type}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaSuitcase /> <strong>Luggage:</strong> {booking.luggage_weight} kg
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaCalendarAlt /> <strong>Arrival:</strong> {formatDateTime(booking.arrival_time)}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaUser /> <strong>Helper:</strong> {booking.helper}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaWallet /> <strong>Fare:</strong> ₹{booking.fare}
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <FaClock /> <strong>Booked At:</strong> {formatDateTime(booking.timestamp)}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4"
                >
                    <Button onClick={() => navigate("/")} className="btn-tri">
                        Back to Home
                    </Button>
                </motion.div>
            </Container>
        </motion.div>
    );
}
