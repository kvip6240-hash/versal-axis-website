import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { Play, CheckCircle2, RotateCcw, Activity, ChevronUp, ChevronDown, Sliders } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const location = useLocation();
  const {
    isLoggedIn,
    projects,
    simulateWorkStarted,
    simulateProjectUpdate,
    simulateProjectCompleted,
    resetDemo,
  } = useDemo();

  const [expanded, setExpanded] = useState(true);

  if (!isLoggedIn || !location.pathname.startsWith('/requester')) return null;

  const latestProject = projects[0];

  return (
    <div className="demo-control-bar-root">
      <div className="demo-control-bar-inner">
        <div className="demo-control-bar-header" onClick={() => setExpanded(prev => !prev)}>
          <div className="demo-badge-wrap">
            <span className="demo-pulse-dot" />
            <Sliders size={14} />
            <span className="demo-badge-text">DEMO PROVIDER SIMULATOR</span>
          </div>
          <button className="demo-toggle-btn">
            {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {expanded && (
          <div className="demo-control-actions">
            {latestProject ? (
              <>
                <div className="demo-active-proj-info">
                  <span className="proj-lbl">Active Project:</span>
                  <span className="proj-name">{latestProject.id} ({latestProject.status})</span>
                </div>
                <div className="demo-btn-group">
                  <button
                    className="demo-action-btn"
                    onClick={() => simulateWorkStarted(latestProject.id)}
                    title="Simulate provider starting work on site"
                  >
                    <Play size={13} />
                    <span>Work Started</span>
                  </button>

                  <button
                    className="demo-action-btn"
                    onClick={() => simulateProjectUpdate(latestProject.id, 'Electrical & HVAC diagnostics completed in main office.')}
                    title="Post a live progress update"
                  >
                    <Activity size={13} />
                    <span>Project Update</span>
                  </button>

                  <button
                    className="demo-action-btn highlight"
                    onClick={() => simulateProjectCompleted(latestProject.id)}
                    title="Simulate provider completing the project"
                  >
                    <CheckCircle2 size={13} />
                    <span>Project Completed</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="demo-no-proj">
                <span>Accept a quotation & pay upfront to unlock project simulation controls.</span>
              </div>
            )}

            <div className="demo-footer-reset">
              <button className="demo-reset-btn" onClick={resetDemo}>
                <RotateCcw size={12} />
                <span>Reset Demo Journey</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
