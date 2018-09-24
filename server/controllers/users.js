const User = require('../models').User;
var uid = require('node-uid');

module.exports = {
  create(req, res) {
    return User
    .findOrCreate({where: {
      $or: [
        {email: req.body.email},
        {user: req.body.user}
      ]},
      defaults: {
          name: req.body.name,
          email: req.body.email,
          user: req.body.user,
          password: req.body.password,
          uid_short: generateUids(1),
          secret_key: generateUids(4)
      }})
      .then(user => res.status(201).send(user))
      .catch(error => {
        console.log(error)          
        return res.status(400).send({error: 'name, email e password são obrigatórios, verifique se esse é o problema.'})
      })
  },
  list(req, res) {
    return User
      .findAll()
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error))
  },
  update(req, res) {
    return User
      .update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user: req.body.user
        },
        {where: {id: req.params.id}}
      )
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error))
  },
  login(req, res) {
    return User
      .findOne({ where: {
        $or: [
          {user: req.body.user, password: req.body.password},
          {email: req.body.email, password: req.body.password}
        ]}})
      .then(check => {
        if(check) return res.status(201).send({user: check, check: true})
        else return res.status(201).send({check: false})
      })
      .catch(error => res.status(400).send(error));
  },
  validation(req, res) {
    return User
      .findOne({where: {[req.query.name]: req.query.value}})
      .then(check => {
        if(check) return res.status(201).send({check: check})
        else return res.status(201).send({check: false})
      })
      .catch(error => res.status(400).send(error));
  }
}

function generateUids(qtd) {
    var uuid = ""
    while(qtd > 1){
      uuid += uid(8) + "-"
      qtd--
    }
    uuid += uid(8)
    return uuid
  }