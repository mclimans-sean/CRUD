const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validMovie(movie) {
  const hasTitle = typeof movie.title == 'string' && movie.title.trim() != '';
  const hasURL = typeof movie.imdb_url == 'string' && movie.imdb_url.trim() != '';
  const hasRating = !isNaN(movie.rating);
  return hasTitle && hasURL && hasRating;
}

router.get('/', (req, res) => {
  queries.getAll().then(hated => {
    res.json(hated);
  })
})

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(hated => {
    if(hated) {
      res.json(hated);
    } else {
      next()
    }
  })
});

router.post('/', (req, res, next) => {
  if (validMovie(req.body)) {
    queries.create(req.body).then(hated => {
      res.json(hated[0]);
    });
  } else {
    next(new Error('Invalid movie'))
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validMovie(req.body)) {
    queries.update(req.params.id, req.body).then(hated => {
      res.json(hated[0]);
    })
  } else {
    next(new Error('Invalid movie'))
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
