import React from 'react';


const Workshops = ({ concert, workshops }) => (
  <section>
    <p>Workshops: {workshops.map(workshop => workshop.concertId === concert ? `"${workshop.name}", ` : null)}</p>
  </section>
)

export default Workshops;