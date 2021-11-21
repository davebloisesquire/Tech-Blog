const router = require('express').Router();
const { Comment } = require('../../models');

// Get All Comments (just for external testing)
router.get('/', (req, res) => {
  Comment.findAll()
  .then((allComment) => res.json(allComment))
  .catch((error) => res.json(error))
})

// Post New Comment
router.post('/', (req, res) => {
  Comment.create(req.body)
  .then((newComment) => res.json("New Comment Posted"))
  .catch((error) => res.json(error))
})

// Delete Comment by ID
router.delete('/:id', (res, req) => {
  Comment.destroy({
    where: { id: req.params.id }
  })
  .then((deletedComment) => res.json("Comment Removed"))
  .catch((error) => res.json(error))
})

module.exports = router;
