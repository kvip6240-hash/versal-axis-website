import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Star, CheckCircle2, ArrowRight, Building2, ChevronLeft, ThumbsUp, ThumbsDown
} from 'lucide-react';

export const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, submitReview } = useDemo();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id) || projects[0];

  const [overall, setOverall] = useState(5);
  const [quality, setQuality] = useState(5);
  const [comm, setComm] = useState(5);
  const [timeliness, setTimeliness] = useState(5);
  const [prof, setProf] = useState(5);
  const [value, setValue] = useState(5);

  const [feedback, setFeedback] = useState('Punctual, highly professional engineers. The HVAC maintenance was performed cleanly and thoroughly across all floors with zero downtime to our staff.');
  const [recommend, setRecommend] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return <div className="container" style={{ padding: '100px 0' }}>Project not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(project.id, {
      overallRating: overall,
      qualityRating: quality,
      communicationRating: comm,
      timelinessRating: timeliness,
      professionalismRating: prof,
      valueRating: value,
      writtenFeedback: feedback,
      recommend,
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/requester/dashboard');
    }, 1800);
  };

  const renderStarPicker = (val: number, setVal: (n: number) => void) => (
    <div className="star-picker">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={22}
          className={`star-icon ${n <= val ? 'active' : ''}`}
          onClick={() => setVal(n)}
          fill={n <= val ? '#F59E0B' : 'transparent'}
        />
      ))}
    </div>
  );

  return (
    <div className="review-page-root">
      <div className="container">
        <button className="back-link-btn" onClick={() => navigate('/requester/projects')}>
          <ChevronLeft size={16} /> Back to Projects
        </button>

        <div className="review-card-box">
          <div className="review-header">
            <span className="kicker">FEEDBACK & QUALITY CONTROL</span>
            <h2>Rate & Review Your Provider</h2>
            <p>Share your experience with PrimeCare Facilities Ltd to support network quality standards.</p>

            <div className="review-prov-strip">
              <Building2 size={20} color="#146358" />
              <div>
                <strong>{project.providerName}</strong>
                <span>Project: {project.projectName} ({project.id})</span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="review-success-msg">
              <CheckCircle2 size={52} color="#10B981" />
              <h3>Review Submitted Successfully!</h3>
              <p>Project <strong>{project.id}</strong> is now marked as <strong>CLOSED</strong>.</p>
              <span>Returning to Requester Dashboard...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              {/* OVERALL RATING */}
              <div className="rating-block overall-block">
                <label>Overall Experience</label>
                {renderStarPicker(overall, setOverall)}
              </div>

              {/* CATEGORY RATINGS GRID */}
              <div className="rating-cat-grid">
                <div className="cat-rating-item">
                  <label>Quality of Work</label>
                  {renderStarPicker(quality, setQuality)}
                </div>
                <div className="cat-rating-item">
                  <label>Communication</label>
                  {renderStarPicker(comm, setComm)}
                </div>
                <div className="cat-rating-item">
                  <label>Timeliness & Punctuality</label>
                  {renderStarPicker(timeliness, setTimeliness)}
                </div>
                <div className="cat-rating-item">
                  <label>Professionalism</label>
                  {renderStarPicker(prof, setProf)}
                </div>
                <div className="cat-rating-item">
                  <label>Value for Money</label>
                  {renderStarPicker(value, setValue)}
                </div>
              </div>

              {/* WRITTEN FEEDBACK */}
              <div className="form-group">
                <label>Written Feedback</label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Share specific details about the service quality, staff behavior, and work execution..."
                  required
                />
              </div>

              {/* RECOMMENDATION QUESTION */}
              <div className="recommend-question-block">
                <label>Would you recommend this provider to other businesses?</label>
                <div className="rec-btn-pair">
                  <button
                    type="button"
                    className={`rec-choice-btn ${recommend ? 'active-yes' : ''}`}
                    onClick={() => setRecommend(true)}
                  >
                    <ThumbsUp size={16} /> Yes, Highly Recommend
                  </button>
                  <button
                    type="button"
                    className={`rec-choice-btn ${!recommend ? 'active-no' : ''}`}
                    onClick={() => setRecommend(false)}
                  >
                    <ThumbsDown size={16} /> No
                  </button>
                </div>
              </div>

              <div className="review-submit-row">
                <button type="submit" className="btn-primary pill full-width magnetic-btn">
                  Submit Review & Close Project <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
