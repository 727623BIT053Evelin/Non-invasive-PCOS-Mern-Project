const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { auth } = require('../middleware/auth');

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { group, page = 1, limit = 10 } = req.query;

        const query = group && group !== 'all' ? { group } : {};

        const posts = await Post.find(query)
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Post.countDocuments(query);

        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Posts fetch error:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { content, group, imageUrl } = req.body;

        if (!content || !group) {
            return res.status(400).json({ message: 'Please provide content and group' });
        }

        const post = new Post({
            user: req.user._id,
            content,
            group,
            imageUrl
        });

        await post.save();
        await post.populate('user', 'name email');

        res.status(201).json(post);
    } catch (error) {
        console.error('Post creation error:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
});

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check ownership
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this post' });
        }

        const { content, group } = req.body;
        if (content) post.content = content;
        if (group) post.group = group;

        await post.save();
        await post.populate('user', 'name email');

        res.json(post);
    } catch (error) {
        console.error('Post update error:', error);
        res.status(500).json({ message: 'Error updating post' });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check ownership
        if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        // Delete associated comments
        await Comment.deleteMany({ post: req.params.id });

        await post.deleteOne();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Post deletion error:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
});

// @route   POST /api/posts/:id/like
// @desc    Like/unlike post
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const likeIndex = post.likes.indexOf(req.user._id);

        if (likeIndex > -1) {
            // Unlike
            post.likes.splice(likeIndex, 1);
            post.likesCount = post.likes.length;
        } else {
            // Like
            post.likes.push(req.user._id);
            post.likesCount = post.likes.length;
        }

        await post.save();

        res.json({ likesCount: post.likesCount, liked: likeIndex === -1 });
    } catch (error) {
        console.error('Like error:', error);
        res.status(500).json({ message: 'Error processing like' });
    }
});

// @route   GET /api/posts/:id/comments
// @desc    Get comments for a post
// @access  Public
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        console.error('Comments fetch error:', error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// @route   POST /api/posts/:id/comments
// @desc    Add comment to post
// @access  Private
router.post('/:id/comments', auth, async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Please provide comment content' });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            post: req.params.id,
            user: req.user._id,
            content
        });

        await comment.save();
        await comment.populate('user', 'name email');

        // Update comments count
        post.commentsCount += 1;
        await post.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error('Comment creation error:', error);
        res.status(500).json({ message: 'Error creating comment' });
    }
});

// @route   DELETE /api/posts/:postId/comments/:commentId
// @desc    Delete comment
// @access  Private
router.delete('/:postId/comments/:commentId', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check ownership
        if (comment.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();

        // Update comments count
        const post = await Post.findById(req.params.postId);
        if (post) {
            post.commentsCount = Math.max(0, post.commentsCount - 1);
            await post.save();
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Comment deletion error:', error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
});

module.exports = router;
