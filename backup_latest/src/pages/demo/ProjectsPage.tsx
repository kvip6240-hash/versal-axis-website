import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Briefcase, ShieldCheck, Clock, CheckCircle2, Zap, ArrowRight,
  MapPin, AlertCircle, ChevronRight, Plus
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useDemo();
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'SCHEDULED':
        return <span className="status-pill info"><ShieldCheck size={12} /> Confirmed</span>;
      case 'WORK STARTED':
      case 'IN PROGRESS':
        return <span className="status-pill active"><Zap size={12} /> Work In Progress</span>;
      case 'COMPLETED':
        return <span className="status-pill success"><CheckCircle2 size={12} /> Completed</span>;
      case 'BALANCE PAYMENT DUE':
        return <span className="status-pill danger"><AlertCircle size={12} /> Balance Due</span>;
      case 'CLOSED':
        return <span className="status-pill neutral">Closed</span>;
      default:
        return <span className="status-pill info">{status}</span>;
    }
  };

  return (
    <div className="projects-page-root">
      <div className="container">
        <div className="page-head-row">
          <div>
            <span className="kicker">ACTIVE & COMPLETED JOBS</span>
            <h2>Property Projects</h2>
            <p>Track project timelines, provider updates, completion status and payments.</p>
          </div>
          <button className="btn-primary pill" onClick={() => navigate('/requester/create-request')}>
            <Plus size={16} /> Create Request
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="projects-empty-box">
            <Briefcase size={40} color="#146358" />
            <h3>No Projects Active Yet</h3>
            <p>Accept a quotation from your submitted requests to launch your project.</p>
            <button className="btn-primary pill" onClick={() => navigate('/requester/requests')}>
              View Requests <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(proj => (
              <div key={proj.id} className="project-card" onClick={() => navigate(`/requester/project/${proj.id}`)}>
                <div className="proj-card-head">
                  <div>
                    <span className="proj-id-badge">{proj.id}</span>
                    <h3>{proj.projectName}</h3>
                  </div>
                  {getStatusBadge(proj.status)}
                </div>

                <div className="proj-card-body">
                  <div><strong>Provider:</strong> {proj.providerName}</div>
                  <div><strong>Location:</strong> {proj.location}</div>
                  <div><strong>Total Value:</strong> £{proj.totalValue.toLocaleString()}</div>
                  <div><strong>Payment Status:</strong> {proj.paymentStatus}</div>
                </div>

                <div className="proj-card-foot">
                  <span className="sched-date">Scheduled: {proj.scheduledDate}</span>
                  <span className="track-link">Track Project <ChevronRight size={14} /></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
