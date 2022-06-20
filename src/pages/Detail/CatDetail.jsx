import MyAlerts from 'components/MyAlerts';
import useCatDetail from 'hooks/useCatDetail';
import React from 'react';
import {
  Button,
  Card,
  Col, Container, Row
} from 'react-bootstrap';

/**
 * Renders the Cat details page
 */
const CatDetail = () => {
  const { isLoading, handleBack, catDetail } = useCatDetail();

  return (
    <Container style={{ padding: '40px' }}>
      <MyAlerts storeKey="detail" />
      <Row lg={8}>
        <Col>
          {!isLoading('detail') && catDetail ? (
            <Card className="mx-auto my-3">
              <Card.Header>
                <Button onClick={handleBack}>
                  Back
                </Button>
              </Card.Header>
              <Card.Img variant="top" src={catDetail?.url} />
              <Card.Body className="d-grid gap-2">
                <h4>{catDetail?.breeds[0].name}</h4>
                <h5>Origin: {catDetail?.breeds[0].origin}</h5>
                <h6>{catDetail?.breeds[0].temperament}</h6>
                <p>{catDetail?.breeds[0].description}</p>
              </Card.Body>
            </Card>
          ) : (
            <h3>Loading...</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CatDetail;
