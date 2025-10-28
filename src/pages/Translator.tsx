import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaLanguage, FaExchangeAlt, FaCopy } from "react-icons/fa";
import "./Translator.css";

export default function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://coolieg.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source: sourceLang, target: targetLang }),
      });
      const data = await response.json();
      setTranslated(data.translatedText);
      setHighlight(true);
    } catch (err) {
      console.error(err);
      setTranslated("Error translating text.");
      setHighlight(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (highlight) {
      const timer = setTimeout(() => setHighlight(false), 800);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setTranslated("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translated);
  };

  return (
    <div className="translator-wrapper py-4">
      <Container className="translator-container">
        <h2 className="text-center mb-4 fw-bold text-gradient">
          <FaLanguage /> Translator
        </h2>

        <Card className="translator-card shadow-lg">
          <Row className="mb-3 g-2">
            <Col xs={5}>
              <Form.Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Form.Select>
            </Col>
            <Col xs={2} className="d-flex justify-content-center align-items-center">
              <Button variant="outline-primary" onClick={handleSwap}><FaExchangeAlt /></Button>
            </Col>
            <Col xs={5}>
              <Form.Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Enter Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text..."
            />
          </Form.Group>

          <div className="text-center mb-3">
            <Button className="btn-tri px-4" onClick={handleTranslate} disabled={loading}>
              {loading ? "Translating..." : "Translate"}
            </Button>
          </div>

          {translated && (
            <Card className={`translated-card ${highlight ? "highlight" : ""}`}>
              <div className="translated-text">{translated}</div>
              <Button variant="outline-secondary" size="sm" className="copy-btn" onClick={handleCopy}>
                <FaCopy />
              </Button>
            </Card>

          )}
        </Card>
      </Container>
    </div>
  );
}
