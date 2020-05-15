const expect = require('chai').expect;
const mongoose = require('mongoose');

const Workshop = require('../workshop.model');

it('should throw an error if no args', () => {
  const dep = new Workshop({});

  dep.validate(err => {
    expect(err.errors.name).to.exist;
  });

});