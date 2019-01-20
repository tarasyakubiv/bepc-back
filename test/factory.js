process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Factory = require('../model/factory');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Factories', () => {
    beforeEach((done) => { //Before each test we empty the database
        Factory.deleteOne({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET factory', () => {
      it('it should GET all the factories', (done) => {
        chai.request(server)
            .get('/api/factories')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.root.should.be.a('array');
                  res.body.root.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
 describe('/POST factory', () => {
    it('it should not POST a factory without count', (done) => {
        let factory = {
            name: "Test Factory",
            randomLowerBound: 10,
            randomUpperBound: 0
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
});

describe('/POST factory', () => {
    it('it should not POST a factory without bounds', (done) => {
        let factory = {
            name: "Test Factory",
            childCount: 5
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
});

describe('/POST factory', () => {
    it('it should not POST a factory without name', (done) => {
        let factory = {
            randomLowerBound: 10,
            randomUpperBound: 0,
            childCount: 5
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
});

describe('/POST factory', () => {
    it('it should not POST a factory with incorrect bounds', (done) => {
        let factory = {
            name: "Test Factory",
            randomLowerBound: 4,
            randomUpperBound: 0,
            childCount: 5
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
});

describe('/POST factory', () => {
    it('it should not POST a factory with incorrect count', (done) => {
        let factory = {
            name: "Test Factory",
            randomLowerBound: 4,
            randomUpperBound: 0,
            childCount: 16
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
});

describe('/POST factory', () => {
    it('it should POST a factory', (done) => {
        let factory = {
            name: "Test Factory",
            randomLowerBound: 4,
            randomUpperBound: 10,
            childCount: 15
        }
      chai.request(server)
          .post('/api/factories')
          .send(factory)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.factory.should.have.property('name');
                res.body.factory.should.have.property('randomLowerBound');
                res.body.factory.should.have.property('randomUpperBound');
                res.body.factory.should.have.property('childCount');
                res.body.factory.should.have.property('children');
                res.body.factory.children.should.be.a('array');
                res.body.factory.children.should.have.length(res.body.factory.childCount);
            done();
          });
    });
});

/*
  * Test the /PATCH/:id route
  */
 describe('/PATCH/:id factory', () => {
    it('it should not UPDATE a factory with empty name', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 10, 
            randomLowerBound: 10, 
            randomUpperBound: 100}
            )
            factory.save((err, factory) => {
              chai.request(server)
              .patch('/api/factories/' + factory.id)
              .send({name: "", childCount: 5, randomLowerBound: 5, randomUpperBound: 10})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.factory.should.have.property('name').eql("Test Factory");
                done();
              });
        });
    });
});

 describe('/PATCH/:id factory', () => {
    it('it should not UPDATE a factory with incorrect bounds', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 10, 
            randomLowerBound: 10, 
            randomUpperBound: 100}
            )
            factory.save((err, factory) => {
              chai.request(server)
              .patch('/api/factories/' + factory.id)
              .send({name: "Updated Test Factory", childCount: 5, randomLowerBound: 1000, randomUpperBound: 10})
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
});

describe('/PATCH/:id factory', () => {
    it('it should not UPDATE a factory with incorrect count', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 10, 
            randomLowerBound: 10, 
            randomUpperBound: 100}
            )
            factory.save((err, factory) => {
              chai.request(server)
              .patch('/api/factories/' + factory.id)
              .send({name: "Updated Test Factory", childCount: 25, randomLowerBound: 10, randomUpperBound: 100})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.factory.should.have.property('childCount').eql(10);
                done();
              });
        });
    });
});

 describe('/PATCH/:id factory', () => {
    it('it should UPDATE a factory given the id', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 10, 
            randomLowerBound: 10, 
            randomUpperBound: 100}
            )
            factory.save((err, factory) => {
              chai.request(server)
              .patch('/api/factories/' + factory.id)
              .send({name: "Updated Test Factory", childCount: 5, randomLowerBound: 100, randomUpperBound: 1000})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.factory.should.have.property('name').eql("Updated Test Factory");
                    res.body.factory.should.have.property('randomLowerBound').eql(100);
                    res.body.factory.should.have.property('randomUpperBound').eql(1000);
                    res.body.factory.should.have.property('childCount').eql(10);
                done();
              });
        });
    });
});
/*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id factory', () => {
    it('it should generate factory children given the id', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 5, 
            randomLowerBound: 10, 
            randomUpperBound: 100,
            children: [11, 15, 43, 99, 54]
            }
            )
            factory.save((err, factory) => {
              chai.request(server)
              .put('/api/factories/' + factory.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.factory.should.have.property('childCount').eql(5);
                    res.body.factory.should.have.property('children').to.not.eql([11, 15, 43, 99, 54]);
                done();
              });
        });
    });
});

 /*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id factory', () => {
    it('it should DELETE a factory given the id', (done) => {
        let factory = new Factory({
            name: "Test Factory", 
            childCount: 5, 
            randomLowerBound: 10, 
            randomUpperBound: 100,
            children: [11, 15, 43, 99, 54]
            }
            )
        factory.save((err, factory) => {
              chai.request(server)
              .delete('/api/factories/' + factory.id)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
});


});