const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
 } = require('../../controllers/thought-controller')

//api/thoughts

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(createThought);


//api/thoughts/:id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.put(addReaction);
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;