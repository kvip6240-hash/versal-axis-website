import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Bell, Plus, LayoutDashboard, FileText, Briefcase, MessageSquare,
  User, LogOut, RotateCcw, Check, ChevronDown
} from 'lucide-react';

export const RequesterNavbar: React.FC = () => {
  const { isLoggedIn, logout, unreadCount, notifications, markAllNotificationsAsRead, resetDemo } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="req-nav-wrapper">
      <div className="req-nav-container">
        {/* BRAND & DEMO BADGE */}
        <div className="req-nav-brand-wrap">
          <Link to="/" className="req-nav-brand">
            <img src="/fixora-logo.png" alt="VERSAL AXIS" className="logo-img" />
            <span className="brand-text">VERSAL AXIS</span>
          </Link>
          <div className="req-demo-badge">
            <span className="dot" />
            <span>DEMO ACCOUNT</span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="req-nav-links">
          <Link to="/requester/dashboard" className={`req-nav-link ${isActive('/requester/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
          <Link to="/requester/requests" className={`req-nav-link ${isActive('/requester/requests') ? 'active' : ''}`}>
            <FileText size={16} />
            <span>Requests</span>
          </Link>
          <Link to="/requester/projects" className={`req-nav-link ${isActive('/requester/projects') ? 'active' : ''}`}>
            <Briefcase size={16} />
            <span>Projects</span>
          </Link>
          <Link to="/requester/messages" className={`req-nav-link ${isActive('/requester/messages') ? 'active' : ''}`}>
            <MessageSquare size={16} />
            <span>Messages</span>
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="req-nav-right">
          {/* CREATE REQUEST CTA */}
          <Link to="/requester/create-request" className="btn-primary pill req-create-btn">
            <Plus size={16} />
            <span>Create Request</span>
          </Link>

          {/* NOTIFICATION BELL */}
          <div className="req-notif-dropdown-wrap" ref={notifRef}>
            <button
              className="req-icon-btn"
              onClick={() => setNotifOpen(prev => !prev)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="req-notif-badge">{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div className="req-dropdown-panel notif-panel">
                <div className="notif-panel-header">
                  <div className="notif-title-wrap">
                    <h4>Notifications</h4>
                    {unreadCount > 0 && <span className="notif-count-pill">{unreadCount} unread</span>}
                  </div>
                  <button className="mark-read-btn" onClick={markAllNotificationsAsRead}>
                    <Check size={12} /> Mark all read
                  </button>
                </div>
                <div className="notif-list">
                  {notifications.length === 0 ? (
                    <div className="notif-empty">No notifications yet</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`notif-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => {
                          setNotifOpen(false);
                          navigate(n.link);
                        }}
                      >
                        <div className="notif-item-content">
                          <span className="notif-item-title">{n.title}</span>
                          <p className="notif-item-msg">{n.message}</p>
                          <span className="notif-item-time">{n.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Link to="/requester/notifications" className="notif-view-all" onClick={() => setNotifOpen(false)}>
                  View All Notifications
                </Link>
              </div>
            )}
          </div>

          {/* PROFILE AVATAR DROPDOWN */}
          <div className="req-profile-dropdown-wrap" ref={profileRef}>
            <button className="req-profile-trigger" onClick={() => setProfileOpen(prev => !prev)}>
              <div className="req-avatar">AM</div>
              <div className="req-profile-info">
                <span className="req-user-name">Alex Morgan</span>
                <span className="req-user-co">Evergreen Buildings</span>
              </div>
              <ChevronDown size={14} />
            </button>

            {profileOpen && (
              <div className="req-dropdown-panel profile-panel">
                <div className="profile-panel-head">
                  <strong>Alex Morgan</strong>
                  <span>demo@fixora.com</span>
                  <span className="profile-role-tag">Requester</span>
                </div>
                <div className="profile-panel-menu">
                  <Link to="/requester/profile" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                    <User size={15} />
                    <span>My Profile</span>
                  </Link>
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      resetDemo();
                    }}
                  >
                    <RotateCcw size={15} />
                    <span>Reset Demo Journey</span>
                  </button>
                  <button
                    className="profile-menu-item logout"
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
