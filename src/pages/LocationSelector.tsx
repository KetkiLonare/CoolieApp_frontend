import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { indiaData } from "../data";

interface Props {
    onLocationChange?: (state: string, city: string) => void;
}

const LocationSelector: React.FC<Props> = ({ onLocationChange }) => {
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        const data = indiaData.India.states.map((s) => s.name);
        setStates(data);
    }, []);

    const handleStateChange = (state: string) => {
        setSelectedState(state);
        const stateData = indiaData.India.states.find((s) => s.name === state);
        setCities(stateData ? stateData.cities : []);
        setSelectedCity("");
        if (onLocationChange) onLocationChange(state, "");
    };

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        if (onLocationChange) onLocationChange(selectedState, city);
    };

    return (
        <div className="location-selector">
            <Row>
                <Col xs={12} md={6} className="mb-3">
                    <Form.Label><FaMapMarkerAlt className="me-1" /> State</Form.Label>
                    <Form.Select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={12} md={6} className="mb-3">
                    <Form.Label><FaMapMarkerAlt className="me-1" /> City</Form.Label>
                    <Form.Select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)} disabled={!selectedState}>
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </div>
    );
};

export default LocationSelector;
