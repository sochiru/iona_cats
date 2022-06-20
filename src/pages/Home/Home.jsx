import MyAlerts from 'components/MyAlerts';
import useBreeds from 'hooks/useBreeds';
import React from 'react';
import {
  Button,
  Card,
  Col, Container, Form, Row
} from 'react-bootstrap';

/**
 * Renders the Home page
 */
const Home = () => {
  const {
    isLoading, selectedBreed, breeds, searchBreeds, onChangeBreed, isLastPage, loadMore, viewCatDetails,
  } = useBreeds();

  return (
    <Container style={{ padding: '40px' }}>
      <MyAlerts storeKey="breeds" />
      <h1>Cat Browser</h1>
      <div style={{ marginTop: '24px' }}>
        <Row lg={4}>
          <Form>
            <Form.Label>Breed</Form.Label>
            <Form.Select
              value={selectedBreed || ''}
              onChange={onChangeBreed}
              disabled={isLoading('breeds')}
            >
              {breeds && (
                <>
                  <option key={0} value="">Select breed</option>
                  {breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
                </>
              )}
            </Form.Select>
          </Form>
        </Row>
      </div>
      <MyAlerts storeKey="search" />
      {searchBreeds?.length > 0 ? (
        <Row xs={12} sm={6} md={3} lg={4}>
          {searchBreeds.map((breed) => (
            <Col key={breed.id}>
              <Card className="mx-auto my-3">
                <Card.Img variant="top" src={breed.url} />
                <Card.Body className="d-grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() => viewCatDetails(breed.id)}
                  >
                    View details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : <div style={{ marginTop: '16px', marginBottom: '16px' }}>No cats available</div>}
      {!isLastPage && (
        <Row>
          <Col>
            <Button
              variant="primary"
              disabled={searchBreeds?.length === 0 || isLoading('search')}
              onClick={loadMore}
              className="btn btn-success"
              style={{ marginTop: '16px' }}
            >
              {isLoading('search') ? 'Loading cats...' : 'Load more'}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
