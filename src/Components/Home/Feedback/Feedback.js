import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import user1 from '../../../images/customer-img/customer-1.png';
import user2 from '../../../images/customer-img/customer-2.png';
import user3 from '../../../images/customer-img/customer-3.png';
import LoadingGif from '../../SharedComponents/LodingGif/LoadingGif';

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/getUserReview")
            .then(res => res.json())
            .then(data => {
                setError(false)
                console.log(data);
                setFeedback(data)
            })
            .catch(err => setError(true))
    }, [])
    return (
        <Container style={{ margin: "70px", textAlign: "center" }} id="review" >

            <h1 className="h1Style">Clients <span style={{ color: "#7AB259" }}>Feedback</span> </h1>
            {
                feedback.length === 0 && !error ? (<LoadingGif />):null
            }
               {
               error ? (<h1 className="h1Style"> Data Is not available</h1>):(
                 
           
            <Row style={{ marginTop: "20px" }}>
                {
                    feedback.map(dt =>
                        <Col sm={6} md={4} lg={4} style={{ marginTop: "15px" }}>
                            <div style={{ padding: "10px", marginLeft: "0px 10px", border: "1px solid #BFBFBF" }}>

                                <Row style={{ padding: "20px 0px" }} >
                                    <Col xs={3} style={{ textAlign: "right" }}>
                                        <img src={dt.photoUrl} alt="" width="100%" style={{ borderRadius: "50%" }} />

                                    </Col>
                                    <Col xs={8}>
                                        <h6 className="text-parimary">{dt.name}</h6>
                                        <small className="text-secondary">{dt.companyName}</small><br />
                                    </Col>

                                </Row>
                                <p>{dt.description}</p>
                            </div>

                        </Col>
                    )
                }
            </Row>
               )
            }
        </Container>
    );
};

export default Feedback;