import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { Bell, CheckCircle2, ArrowRight, Clock, FileText, CreditCard, Star, ShieldCheck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDemo();
  const navigate = useNavigate();

  const getNotifIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('submit') || lower.includes('request')) return <FileText size={20} />;
    if (lower.includes('proposal') || lower.includes('quote')) return <ShieldCheck size={20} />;
    if (lower.includes('payment') || lower.includes('paid')) return <CreditCard size={20} />;
    if (lower.includes('review') || lower.includes('rating')) return <Star size={20} />;
    if (lower.includes('complet')) return <CheckCircle2 size={20} />;
    return <Bell size={20} />;
  };

  return (
    <div className="notif-page-root">
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="page-head-row">
          <div>
            <span className="kicker">REAL-TIME UPDATES</span>
            <h2 className="notif-page-heading">Notifications</h2>
            <p className="notif-page-subtext">Every key event generates an interactive notification leading directly to the relevant stage.</p>
          </div>

          {notifications.length > 0 && (
            <button className="btn-mark-all-read" onClick={markAllNotificationsAsRead}>
              <CheckCircle2 size={16} /> Mark All as Read
            </button>
          )}
        </div>

        <div className="notif-full-list">
          {notifications.length === 0 ? (
            <div className="notif-empty-box">
              <div className="notif-empty-icon"><Bell size={36} /></div>
              <h3>No Notifications Yet</h3>
              <p>When there are updates on your requests or projects, they will appear here.</p>
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`notif-card-box ${!n.read ? 'unread' : ''}`}
                onClick={() => {
                  markNotificationAsRead(n.id);
                  navigate(n.link);
                }}
              >
                <div className="notif-box-icon-wrap">
                  {getNotifIcon(n.title)}
                </div>

                <div className="notif-box-content">
                  <div className="notif-box-top-line">
                    <h4 className="notif-box-title">{n.title}</h4>
                    <div className="notif-box-meta">
                      {!n.read && <span className="unread-badge-pill">Unread</span>}
                      <span className="time-lbl"><Clock size={13} /> {n.timestamp}</span>
                    </div>
                  </div>
                  <p className="notif-box-desc">{n.message}</p>
                </div>

                <div className="notif-box-action">
                  <button className="btn-open-stage">
                    <span>Open</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
