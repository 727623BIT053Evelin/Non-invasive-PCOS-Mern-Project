import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Heart, Lightbulb, Star, Apple, Activity, Plus, Share2, MoreHorizontal, Search, Send, Trash2, Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';

function Community({ user }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeGroup, setActiveGroup] = useState('All Feed');
    const [newPostContent, setNewPostContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showComments, setShowComments] = useState({}); // Map of postId -> boolean
    const [commentContent, setCommentContent] = useState({}); // Map of postId -> string
    const [postComments, setPostComments] = useState({}); // Map of postId -> Comment[]
    const fileInputRef = useRef(null);

    const groups = [
        { name: 'All Feed', icon: <Activity size={18} />, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
        { name: 'Diet & Fitness for PCOS', icon: <Apple size={18} />, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
        { name: 'Ask the Doctor', icon: <Activity size={18} />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
        { name: 'Mind & Body Wellness', icon: <Heart size={18} />, color: 'bg-rose-50 text-rose-600', border: 'border-rose-100' },
        { name: 'Motivation & Stories', icon: <Star size={18} />, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
        { name: 'PCOS & Fertility Planning', icon: <Users size={18} />, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
        { name: 'Supplements', icon: <Lightbulb size={18} />, color: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-100' },
        { name: 'Recipes & Meal Plans', icon: <MessageSquare size={18} />, color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
        { name: 'General', icon: <MessageSquare size={18} />, color: 'bg-gray-50 text-gray-600', border: 'border-gray-100' }
    ];

    useEffect(() => {
        fetchPosts();
    }, [activeGroup]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            let url = '/api/posts';
            if (activeGroup !== 'All Feed') {
                url += `?group=${encodeURIComponent(activeGroup)}`;
            }
            const response = await axios.get(url);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCreatePost = async () => {
        if (!newPostContent.trim() && !image) return;
        if (!user) return alert('Please login to post');

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const groupToPost = activeGroup === 'All Feed' ? 'General' : activeGroup;

            const formData = new FormData();
            formData.append('content', newPostContent);
            formData.append('group', groupToPost);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post('/api/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPosts([response.data, ...posts]);
            setNewPostContent('');
            removeImage();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLike = async (postId) => {
        if (!user) return alert('Please login to like posts');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/api/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, likes: response.data.liked ? [...post.likes, user._id] : post.likes.filter(id => id !== user._id), likesCount: response.data.likesCount }
                    : post
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const toggleComments = async (postId) => {
        setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
        if (!postComments[postId]) {
            try {
                const response = await axios.get(`/api/posts/${postId}/comments`);
                setPostComments(prev => ({ ...prev, [postId]: response.data }));
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    };

    const handlePostComment = async (postId) => {
        if (!commentContent[postId]?.trim()) return;
        if (!user) return alert('Please login to comment');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/api/posts/${postId}/comments`, {
                content: commentContent[postId]
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPostComments(prev => ({
                ...prev,
                [postId]: [response.data, ...(prev[postId] || [])]
            }));

            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post
            ));

            setCommentContent(prev => ({ ...prev, [postId]: '' }));
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    // Helper to get group styles
    const getGroupStyle = (groupName) => {
        return groups.find(g => g.name === groupName) || groups[groups.length - 1]; // Default to last (General)
    };

    return (
        <div className="container-standard py-8 md:py-12 min-h-screen">
            <div className="w-full flex flex-col lg:flex-row gap-8">

                {/* Left Sidebar - Groups */}
                <aside className="lg:w-80 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Discover Groups</h3>
                        <div className="space-y-2">
                            {groups.map((group, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveGroup(group.name)}
                                    className={`w-full flex items-center gap-4 p-3 rounded-2xl font-bold text-sm transition-all border ${activeGroup === group.name
                                        ? `${group.color} ${group.border} shadow-sm translate-x-2`
                                        : 'text-gray-500 border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`${activeGroup === group.name ? '' : 'text-gray-400 opacity-70'}`}>
                                        {group.icon}
                                    </span>
                                    {group.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content - Feed */}
                <main className="flex-1 space-y-8">
                    {/* Create Post Area */}
                    {user ? (
                        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-purple-900/5 transition-all hover:shadow-purple-900/10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-400 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/30">
                                    {user.name[0].toUpperCase()}
                                </div>
                                <div className="flex-1 relative group">
                                    <textarea
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder={`What's on your mind, ${user.name}?`}
                                        className="w-full bg-gray-50/50 border-2 border-transparent focus:border-purple-100 rounded-3xl px-6 py-4 text-gray-700 outline-none focus:ring-4 focus:ring-purple-50 transition-all font-medium pr-12 min-h-[80px] resize-none"
                                    />
                                    {imagePreview && (
                                        <div className="mt-4 relative inline-block">
                                            <img src={imagePreview} alt="Preview" className="max-h-60 rounded-2xl border border-gray-100" />
                                            <button
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-2 items-center">
                                    <span className="hidden md:inline text-xs font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full mr-2">
                                        Posting to: <span className="text-primary">{activeGroup === 'All Feed' ? 'General' : activeGroup}</span>
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                        ref={fileInputRef}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`p-2 rounded-xl transition-colors ${image ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:bg-gray-50 hover:text-primary'}`}
                                        title="Add image"
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleCreatePost}
                                    disabled={isSubmitting || (!newPostContent.trim() && !image)}
                                    className="bg-primary text-white py-3 px-8 rounded-full font-bold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Send size={16} />
                                    {isSubmitting ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-r from-purple-50 to-white p-8 rounded-[2rem] border border-purple-100 text-center">
                            <p className="text-gray-600 font-medium mb-4">Join our community to share your story!</p>
                            <a href="/login" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-bold text-sm shadow-lg shadow-purple-500/20">Login to Post</a>
                        </div>
                    )}

                    {/* Posts List */}
                    {loading ? (
                        <div className="text-center py-12 text-gray-400">Loading inspiring stories...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <MessageSquare size={24} />
                            </div>
                            <p className="text-gray-500 font-medium">No posts yet in this group. Be the first to share!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post) => {
                                const groupStyle = getGroupStyle(post.group);
                                return (
                                    <div key={post._id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group relative">

                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${
                                                // Simple pseudo-random color based on name length for visual variety
                                                post.user?.name ? ['bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-teal-500'][post.user.name.length % 4] : 'bg-gray-400'
                                                }`}>
                                                {post.user?.name?.[0]?.toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                    {post.user?.name || 'Anonymous'}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs font-medium mt-1">
                                                    <span className={`px-2 py-0.5 rounded-md ${groupStyle.color} ${groupStyle.border} border bg-opacity-50`}>
                                                        {post.group}
                                                    </span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mb-6 pl-2 md:pl-16">
                                            <p className="text-gray-800 leading-relaxed font-medium whitespace-pre-wrap text-[15px]">
                                                {post.content}
                                            </p>
                                            {post.imageUrl && (
                                                <div className="mt-4">
                                                    <img
                                                        src={post.imageUrl}
                                                        alt="Post content"
                                                        className="rounded-2xl max-h-96 w-auto object-cover border border-gray-100"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 pl-2 md:pl-16">
                                            <div className="flex gap-6">
                                                <button
                                                    onClick={() => toggleLike(post._id)}
                                                    className={`flex items-center gap-2 text-sm font-bold transition-all p-2 rounded-xl hover:bg-gray-50 ${user && post.likes.includes(user._id) ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    <Heart size={20} className={user && post.likes.includes(user._id) ? "fill-rose-500" : ""} />
                                                    <span>{post.likesCount}</span>
                                                </button>
                                                <button
                                                    onClick={() => toggleComments(post._id)}
                                                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-all p-2 rounded-xl hover:bg-gray-50"
                                                >
                                                    <MessageSquare size={20} />
                                                    <span>{post.commentsCount}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Comments Section */}
                                        {showComments[post._id] && (
                                            <div className="mt-6 pl-2 md:pl-16 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                {/* Comment Input */}
                                                {user && (
                                                    <div className="flex gap-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Write a supportive comment..."
                                                            value={commentContent[post._id] || ''}
                                                            onChange={(e) => setCommentContent(prev => ({ ...prev, [post._id]: e.target.value }))}
                                                            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                            onKeyDown={(e) => e.key === 'Enter' && handlePostComment(post._id)}
                                                        />
                                                        <button
                                                            onClick={() => handlePostComment(post._id)}
                                                            className="text-primary hover:bg-primary/10 p-3 rounded-xl transition-colors"
                                                        >
                                                            <Send size={18} />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Existing Comments */}
                                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                                    {postComments[post._id]?.map(comment => (
                                                        <div key={comment._id} className="bg-gray-50/80 p-4 rounded-2xl flex gap-3">
                                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                                                                {comment.user?.name?.[0] || '?'}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-bold text-gray-900">{comment.user?.name}</span>
                                                                    <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </main>

                {/* Right Sidebar - Stats/Info (Desktop only) */}
                <aside className="hidden xl:block w-72 space-y-6">
                    <div className="bg-primary p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-purple-500/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform blur-xl"></div>

                        <p className="text-xs font-black text-white/70 uppercase tracking-[0.2em] mb-4 relative z-10">Support Hub</p>
                        <h4 className="text-lg font-bold text-white mb-4 leading-tight relative z-10">Need 1-on-1 Help?</h4>
                        <p className="text-white/80 text-xs font-medium leading-relaxed mb-6 relative z-10">
                            Talk directly with certified PCOS health experts today.
                        </p>
                        <Link to="/consultation" className="block w-full">
                            <button className="w-full bg-white text-primary py-4 rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all relative z-10 hover:bg-purple-50">
                                Book Consultation
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Community Guidelines</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">Be kind and supportive. We are here to help each other grow.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">Respect privacy. What is shared here stays here.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">No medical advice. Always consult a professional.</p>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Community;
