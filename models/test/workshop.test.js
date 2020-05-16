const expect = require('chai').expect;
const mongoose = require('mongoose');

const Workshop = require('../workshop.model');


describe('Workshop', () => {
  const args = ['name', 'concertId'];

  it('should throw an error if no args', () => {
    const workshop = new Workshop({});

    workshop.validate(err => {
      args.forEach(arg => {
        expect(err.errors[arg]).to.exist;
      })
    });
  });

  it('should throw an error if "name" and "concertId are not strings', () => {
    const cases = [{}, []];

    for (let element of cases) {
      const workshop = new Workshop({ name: element, concertId: element });
      workshop.validate(err => {
        args.forEach(arg => {
          expect(err.errors[arg]).to.exist;
        })
      });
    }
  });

  it('should not throw an error if args have proper format', () => {
    const workshop = new Workshop({ name: 'Workshop #1', concertId: 'Concert #1' });

    workshop.validate(err => {
      expect(err).to.not.exist;
    });
  });
});