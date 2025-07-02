import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import "./EngineeringCareer.css";

const Mathematics = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const mathCareers = [
    {
      title: "Data Scientist",
      emoji: "📊",
      description: "Analyze complex data sets to identify trends and derive insights for business decisions.",
      salary: "$100,000 - $160,000",
      growth: "36% (Much faster than average)",
      education: "Master's degree in Mathematics, Statistics, or related field",
      skills: ["Statistical analysis", "Machine learning", "Programming", "Data visualization"]
    },
    {
      title: "Actuary",
      emoji: "📉",
      description: "Analyze financial costs of risk and uncertainty using mathematics, statistics, and financial theory.",
      salary: "$110,000 - $170,000",
      growth: "24% (Much faster than average)",
      education: "Bachelor's degree in Mathematics, Actuarial Science, or Statistics",
      skills: ["Risk assessment", "Statistical modeling", "Financial analysis", "Problem-solving"]
    },
    {
      title: "Mathematician",
      emoji: "🧮",
      description: "Conduct research to develop and understand mathematical principles and solve problems.",
      salary: "$105,000 - $145,000",
      growth: "33% (Much faster than average)",
      education: "Master's or Ph.D. in Mathematics",
      skills: ["Advanced mathematics", "Critical thinking", "Research", "Analytical skills"]
    },
    {
      title: "Statistician",
      emoji: "📈",
      description: "Apply statistical methods to collect, analyze, and interpret data for various sectors.",
      salary: "$90,000 - $145,000",
      growth: "33% (Much faster than average)",
      education: "Master's degree in Statistics or Mathematics",
      skills: ["Statistical analysis", "Data collection", "Problem-solving", "Attention to detail"]
    },
    {
      title: "Quantitative Analyst",
      emoji: "💹",
      description: "Develop and implement complex mathematical models for financial firms.",
      salary: "$125,000 - $200,000+",
      growth: "25% (Much faster than average)",
      education: "Master's or Ph.D. in Mathematics, Physics, or Engineering",
      skills: ["Financial modeling", "Algorithm development", "Programming", "Risk analysis"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Mathematics Careers</h1>
          <p className="lead">
            Mathematics careers involve applying analytical and computational skills to solve complex problems.
            From finance to technology, mathematics professionals play crucial roles in data-driven decision making.
          </p>
          <div className="stats-container mt-4">
            <Row>
              <Col md={4} className="mb-3 mb-md-0">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="stat-info">
                    <h3>Education</h3>
                    <p>Bachelor's degree minimum, with Master's or Ph.D. for advanced positions</p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaDollarSign />
                  </div>
                  <div className="stat-info">
                    <h3>Salary Range</h3>
                    <p>$90,000 - $200,000+ depending on role, location, and experience</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-info">
                    <h3>Job Outlook</h3>
                    <p>24-36% growth rate through 2030 (much faster than average)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Mathematics Careers</h2>
        <div className="careers-container">
          {mathCareers.map((career, index) => (
            <div key={index} className="career-card">
              <div className="career-emoji">{career.emoji}</div>
              <div className="career-content">
                <h3>{career.title}</h3>
                <p>{career.description}</p>
                
                <div className="career-details">
                  <div className="detail-item">
                    <span className="detail-label">Salary Range:</span>
                    <span className="detail-value">{career.salary}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Job Growth:</span>
                    <span className="detail-value">{career.growth}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Education:</span>
                    <span className="detail-value">{career.education}</span>
                  </div>
                </div>
                
                <div className="skills-container">
                  <span className="skills-label">Key Skills:</span>
                  <div className="skills-badges">
                    {career.skills.map((skill, i) => (
                      <Badge key={i} pill bg="light" text="dark" className="skill-badge">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="next-steps-container mt-5 p-4">
          <h2 className="next-steps-title">Next Steps</h2>
          <p className="next-steps-text">
            Ready to pursue a career in mathematics? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Explore degree programs in mathematics, statistics, and related fields</p>
                <Button variant="outline-primary" size="sm">Find Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Certifications</h4>
                <p>Discover industry certifications that can enhance your career prospects</p>
                <Button variant="outline-primary" size="sm">View Certifications</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaChartLine className="next-step-icon" />
                <h4>Career Paths</h4>
                <p>Explore specific career tracks within mathematical fields</p>
                <Button variant="outline-primary" size="sm">View Career Paths</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Mathematics;
