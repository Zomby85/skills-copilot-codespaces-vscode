// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');

// Import data
const commentsPath = path.join(__dirname, '..', 'data', 'comments.json');
const commentsData = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));

// Import functions
const { createComment, deleteComment } = require('../modules/comments');

// Import middleware
const { checkComment } = require('../middleware/comments');

// Import classes
const Comment = require('../classes/Comment');

// @route   GET /comments
// @desc    Get all comments
// @access  Public
router.get('/', (req, res) => {
    res.json(commentsData);
});

// @route   GET /comments/:id
// @desc    Get comment by id
// @access  Public
router.get('/:id', (req, res) => {
    const comment = commentsData.filter(comment => comment.id === req.params.id);
    if (comment.length === 0) return res.status(404).json({ msg: 'Comment not found' });
    res.json(comment[0]);
});

// @route   POST /comments
// @desc    Create new comment
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('body', 'Body is required').not().isEmpty()
], checkComment, (req, res) => {
    const newComment = new Comment(uuidv4(), req.body.name, req.body.email, req.body.body);
    createComment(newComment);
    res.json(newComment);
});

// @route   DELETE /comments/:id
// @desc    Delete comment
// @access  Public
router.delete('/:id', (req, res) => {
    const comment = commentsData.filter(comment => comment.id === req.params.id);
    if (comment.length === 0) return res.status(404).json({ msg: 'Comment not found' });
    deleteComment(comment[0]);
    res.json({ msg: 'Comment deleted', comment: comment[0] });
});

module.exports = router;