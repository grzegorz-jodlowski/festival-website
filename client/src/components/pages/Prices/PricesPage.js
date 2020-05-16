import React from 'react';
import Workshops from '../../features/Workshops/Workshops';
import { Alert, Container, Progress } from 'reactstrap';

class Prices extends React.Component {

  componentDidMount() {
    const { loadConcerts, loadWorkshops } = this.props;
    loadConcerts();
    loadWorkshops();
  }

  render() {
    const { request, concerts, workshops } = this.props;

    if (request.pending) return <Progress animated color="primary" value={50} />;
    else if (request.error) return <Alert color="warning">{request.error}</Alert>;
    else if (!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
    else if (request.success) return (
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>

        <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        {concerts.map(con => {
          switch (con.day) {
            case 1:
              return (
                <div>
                  <h2>Day one</h2>
                  <p>Price: {con.price}$</p>
                  <Workshops key={con._id} concert={con._id} workshops={workshops} />
                </div>
              )
              break;
            case 2:
              return (
                <div>
                  <h2>Day Two</h2>
                  <p>Price: {con.price}$</p>
                  <Workshops key={con._id} concert={con._id} workshops={workshops} />
                </div>
              )
              break;
            case 3:
              return (
                <div>
                  <h2>Day one</h2>
                  <p>Price: {con.price}$</p>
                  <Workshops key={con._id} concert={con._id} workshops={workshops} />
                </div>
              )
              break;
            default:
              console.log(`Sorry, we are out of concerts`);
          }
        })}

      </Container >
    )
  }
};

export default Prices;