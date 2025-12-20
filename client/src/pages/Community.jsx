import { useState } from 'react';
import { Users, MessageSquare, Heart, Lightbulb, Star, Apple, Activity, Plus, Share2, MoreHorizontal, Search, Send } from 'lucide-react';

function Community() {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [activeGroup, setActiveGroup] = useState('All Feed');

    const groups = [
        { name: 'All Feed', icon: <Activity size={18} /> },
        { name: 'Diet & Fitness', icon: <Apple size={18} /> },
        { name: 'Ask the Doctor', icon: <Activity size={18} /> },
        { name: 'Mind & Body Wellness', icon: <Heart size={18} /> },
        { name: 'Motivation & Stories', icon: <Star size={18} /> },
        { name: 'Fertility Planning', icon: <Users size={18} /> },
        { name: 'Supplements', icon: <Lightbulb size={18} /> },
        { name: 'Recipes & Meal Plans', icon: <MessageSquare size={18} /> }
    ];

    const posts = [
        {
            id: 1,
            author: "Priya Sharma",
            role: "Nutrition Specialist",
            time: "2h ago",
            content: "Just shared a new low-GI meal plan in the Recipes group! Remember, small changes in your morning routine can significantly impact insulin sensitivity throughout the day. 🥗",
            likes: 24,
            comments: 5,
            group: "Recipes & Meal Plans",
            tags: ["#PCOSHealth", "#Nutrition"]
        },
        {
            id: 2,
            author: "Sarah J.",
            role: "Community Member",
            time: "5h ago",
            content: "Has anyone else found that morning yoga helps with their mood swings? I've been consistent for 2 weeks now and feeling much calmer. 🧘‍♀️✨",
            likes: 42,
            comments: 12,
            group: "Mind & Body Wellness",
            tags: ["#YogaJourney", "#Wellness"]
        },
        {
            id: 3,
            author: "Dr. Ananya Rai",
            role: "Endocrinologist",
            time: "1d ago",
            content: "A gentle reminder for everyone: Clinical tests are just one part of the story. Listen to your body and track your cycles regularly. This data is invaluable during our consultations.",
            likes: 156,
            comments: 28,
            group: "Ask the Doctor",
            tags: ["#MedicalAdvice", "#Tracking"]
        }
    ];

    const toggleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
        } else {
            newLiked.add(postId);
        }
        setLikedPosts(newLiked);
    };

    return (
        <div className="container-standard py-8 md:py-12 min-h-screen bg-[#FAFBFF]">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Left Sidebar - Groups */}
                <aside className="lg:w-80 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Discover Groups</h3>
                        <div className="space-y-1">
                            {groups.map((group, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveGroup(group.name)}
                                    className={`w - full flex items - center gap - 4 p - 4 rounded - 2xl font - bold text - sm transition - all ${activeGroup === group.name
                                        ? 'bg-purple-50 text-primary'
                                        : 'text-gray-500 hover:bg-gray-50'
                                        } `}
                                >
                                    <span className={`${activeGroup === group.name ? 'text-primary' : 'text-gray-400'} `}>
                                        {group.icon}
                                    </span>
                                    {group.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-4">Growth Quote</p>
                        <p className="text-sm text-gray-700 font-medium italic leading-relaxed">
                            "Every healthy step—no matter how small—moves you closer to hormonal freedom."
                        </p>
                    </div>
                </aside>

                {/* Main Content - Feed */}
                <main className="flex-1 space-y-6">
                    {/* Create Post Area */}
                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-black text-xl">
                                U
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Share your journey with the community..."
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium pr-12"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-primary">
                                        <Plus size={16} />
                                    </div>
                                    Image
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                        <MessageSquare size={16} />
                                    </div>
                                    Poll
                                </button>
                            </div>
                            <button className="bg-primary text-white py-3 px-8 rounded-full font-bold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-purple-500/10 active:scale-95">
                                Create Post
                            </button>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                                <button className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 p-2">
                                    <MoreHorizontal size={20} />
                                </button>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w - 12 h - 12 rounded - 2xl flex items - center justify - center text - white font - bold ${post.role.includes('Doctor') ? 'bg-blue-500' : post.role.includes('Nutrition') ? 'bg-green-500' : 'bg-purple-400'
                                        } `}>
                                        {post.author[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                            {post.author}
                                            {post.role.includes('Doctor') && <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Expert</span>}
                                        </h4>
                                        <p className="text-xs text-gray-400 font-medium tracking-wide items-center flex gap-2">
                                            {post.role} • <span className="text-primary font-bold">{post.group}</span> • {post.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-800 leading-relaxed font-medium mb-4 whitespace-pre-wrap">
                                        {post.content}
                                    </p>
                                    <div className="flex gap-2">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="text-xs font-bold text-primary hover:underline cursor-pointer">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex gap-6">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items - center gap - 2 text - sm font - bold transition - all ${likedPosts.has(post.id) ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                                } `}
                                        >
                                            <Heart size={20} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                        </button>
                                        <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">
                                            <MessageSquare size={20} />
                                            {post.comments}
                                        </button>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 p-2 transition-colors rounded-xl hover:bg-gray-50">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar - Stats/Info (Desktop only) */}
                <aside className="hidden xl:block w-72 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Community Stats</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-2xl font-black text-gray-900">12,482</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Members</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-900">450+</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Posts Today</p>
                            </div>
                            <div className="pt-6 border-t border-gray-50">
                                <button className="w-full py-4 text-xs font-black text-primary uppercase tracking-[0.2em] border-2 border-primary/20 rounded-2xl hover:bg-primary hover:text-white transition-all">
                                    Join The Conversation
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Support Hub</p>
                        <h4 className="text-lg font-bold text-white mb-4 leading-tight">Need 1-on-1 Help?</h4>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed mb-6">
                            Talk directly with certified PCOS health experts today.
                        </p>
                        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-xs shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                            Book Consultation
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Community;
