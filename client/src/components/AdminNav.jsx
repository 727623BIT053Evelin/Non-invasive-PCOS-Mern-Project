import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Calendar } from 'lucide-react';

function AdminNav() {
    const location = useLocation();

    const navItems = [
        {
            name: 'Inbox',
            path: '/admin/messages',
            icon: MessageSquare
        },
        {
            name: 'Consultations',
            path: '/admin/appointments',
            icon: Calendar
        }
    ];

    return (
        <div className="flex justify-center mb-12">
            <div className="flex p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-purple-500/20'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminNav;
