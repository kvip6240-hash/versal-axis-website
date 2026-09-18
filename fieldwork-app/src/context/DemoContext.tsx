import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RequestItem {
  id: string;
  service: string;
  requirement: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  projectTitle: string;
  projectDescription: string;
  existingProvider?: string;
  siteName: string;
  address: string;
  street: string;
  city: string;
  country: string;
  contactName: string;
  phone: string;
  email: string;
  accessInstructions: string;
  preferredDate: string;
  preferredTime: string;
  flexibility: string;
  duration: string;
  attachments: string[];
  submittedDate: string;
  status:
    | 'REQUEST SUBMITTED'
    | 'QUOTATION RECEIVED'
    | 'QUOTATION ACCEPTED'
    | 'AWAITING PAYMENT'
    | 'CONFIRMED'
    | 'SCHEDULED'
    | 'WORK STARTED'
    | 'IN PROGRESS'
    | 'COMPLETED'
    | 'BALANCE PAYMENT DUE'
    | 'PAYMENT COMPLETED'
    | 'REVIEW SUBMITTED'
    | 'CLOSED';
}

export interface ProposalItem {
  id: string;
  requestId: string;
  providerName: string;
  providerLogo?: string;
  service: string;
  projectTitle: string;
  siteName: string;
  scheduledDate: string;
  estimatedDuration: string;
  scopeOfWork: string[];
  whatsIncluded: string[];
  laborCost: number;
  materialsCost: number;
  equipmentCost: number;
  transportCost: number;
  totalQuote: number;
  upfrontPercentage: number;
  upfrontAmount: number;
  balancePercentage: number;
  balanceAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface ProjectItem {
  id: string;
  requestId: string;
  proposalId: string;
  projectName: string;
  service: string;
  providerName: string;
  location: string;
  scheduledDate: string;
  totalValue: number;
  upfrontAmount: number;
  balanceAmount: number;
  upfrontPaid: boolean;
  upfrontTxId?: string;
  balancePaid: boolean;
  balanceTxId?: string;
  paymentStatus: 'AWAITING UPFRONT' | 'UPFRONT PAID' | 'BALANCE DUE' | 'FULLY PAID';
  status:
    | 'CONFIRMED'
    | 'SCHEDULED'
    | 'WORK STARTED'
    | 'IN PROGRESS'
    | 'COMPLETED'
    | 'BALANCE PAYMENT DUE'
    | 'CLOSED';
  timeline: { title: string; date: string; completed: boolean }[];
  updates: { text: string; timestamp: string; author: string }[];
  workSummary?: string;
  completedPhotos?: string[];
  pdfReportUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

export interface ReviewItem {
  id: string;
  projectId: string;
  providerName: string;
  overallRating: number;
  qualityRating: number;
  communicationRating: number;
  timelinessRating: number;
  professionalismRating: number;
  valueRating: number;
  writtenFeedback: string;
  recommend: boolean;
  date: string;
}

interface DemoContextType {
  isLoggedIn: boolean;
  login: (email?: string, password?: string) => boolean;
  logout: () => void;
  requests: RequestItem[];
  proposals: ProposalItem[];
  projects: ProjectItem[];
  notifications: NotificationItem[];
  reviews: ReviewItem[];
  createRequest: (data: Partial<RequestItem>) => string;
  acceptProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;
  payUpfront: (projectId: string, cardData: any) => void;
  simulateWorkStarted: (projectId: string) => void;
  simulateProjectUpdate: (projectId: string, text?: string) => void;
  simulateProjectCompleted: (projectId: string) => void;
  payBalance: (projectId: string, cardData: any) => void;
  submitReview: (projectId: string, reviewData: any) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetDemo: () => void;
  unreadCount: number;
}

const DEFAULT_USER = {
  email: 'demo@fixora.com',
  name: 'Alex Morgan',
  company: 'Evergreen Buildings',
  role: 'Requester',
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-2026-001248',
    service: 'HVAC & AC',
    requirement: 'Full quarterly maintenance, filter replacements and system diagnostic for 4-floor commercial building.',
    priority: 'High',
    projectTitle: 'Office HVAC Maintenance',
    projectDescription: 'Complete HVAC inspection, coil cleaning, and thermostat calibration across main office floors.',
    existingProvider: 'None',
    siteName: 'Evergreen Tower',
    address: '45 Deansgate',
    street: 'Deansgate',
    city: 'Manchester',
    country: 'United Kingdom',
    contactName: 'Alex Morgan',
    phone: '+44 161 892 4000',
    email: 'demo@fixora.com',
    accessInstructions: 'Report to Reception on Ground Floor for security badge.',
    preferredDate: '2026-09-20',
    preferredTime: 'Morning (08:00 - 12:00)',
    flexibility: '± 1 Day',
    duration: '1 Full Day',
    attachments: ['hvac_spec_doc.pdf', 'site_photo_1.jpg'],
    submittedDate: '14 Sep 2026',
    status: 'QUOTATION RECEIVED',
  },
];

const INITIAL_PROPOSALS: ProposalItem[] = [
  {
    id: 'PROP-2026-0091',
    requestId: 'REQ-2026-001248',
    providerName: 'PrimeCare Facilities Ltd',
    service: 'HVAC & AC',
    projectTitle: 'Office HVAC Maintenance',
    siteName: 'Evergreen Tower, Manchester',
    scheduledDate: '20 Sep 2026',
    estimatedDuration: '1 Day',
    scopeOfWork: [
      'Full 4-floor HVAC diagnostic test',
      'Replace all HEPA air filters across 16 ceiling units',
      'Condenser coil chemical flush & drain pan treatment',
      'Thermostat system calibration & fan speed testing',
    ],
    whatsIncluded: [
      'Certified Senior HVAC Engineers',
      'All OEM filter replacements included',
      'Complete digital completion report & compliance cert',
    ],
    laborCost: 950,
    materialsCost: 450,
    equipmentCost: 250,
    transportCost: 100,
    totalQuote: 1750,
    upfrontPercentage: 60,
    upfrontAmount: 1050,
    balancePercentage: 40,
    balanceAmount: 700,
    status: 'PENDING',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Quotation Received',
    message: 'PrimeCare Facilities Ltd has submitted a quotation (£1,750) for request REQ-2026-001248.',
    timestamp: '10 mins ago',
    read: false,
    link: '/requester/proposal/PROP-2026-0091',
  },
  {
    id: 'notif-2',
    title: 'Request Submitted',
    message: 'Your request REQ-2026-001248 has been submitted successfully.',
    timestamp: '1 hour ago',
    read: true,
    link: '/requester/requests',
  },
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('fixora_demo_logged_in') === 'true';
  });

  const [requests, setRequests] = useState<RequestItem[]>(() => {
    const saved = localStorage.getItem('fixora_demo_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [proposals, setProposals] = useState<ProposalItem[]>(() => {
    const saved = localStorage.getItem('fixora_demo_proposals');
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('fixora_demo_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('fixora_demo_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('fixora_demo_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fixora_demo_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('fixora_demo_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('fixora_demo_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('fixora_demo_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('fixora_demo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('fixora_demo_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const login = (email = DEFAULT_USER.email, password = 'demo123') => {
    if (email.toLowerCase() === DEFAULT_USER.email && password === 'demo123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addNotification = (title: string, message: string, link: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      link,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createRequest = (data: Partial<RequestItem>): string => {
    const reqId = `REQ-2026-00${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: RequestItem = {
      id: reqId,
      service: data.service || 'General Maintenance',
      requirement: data.requirement || 'Standard service requirement',
      priority: data.priority || 'Medium',
      projectTitle: data.projectTitle || `${data.service || 'Property'} Project`,
      projectDescription: data.projectDescription || 'Property service request description.',
      existingProvider: data.existingProvider || 'None',
      siteName: data.siteName || 'Evergreen Buildings',
      address: data.address || '45 Deansgate',
      street: data.street || 'Deansgate',
      city: data.city || 'Manchester',
      country: data.country || 'United Kingdom',
      contactName: data.contactName || 'Alex Morgan',
      phone: data.phone || '+44 161 892 4000',
      email: data.email || 'demo@fixora.com',
      accessInstructions: data.accessInstructions || 'Report to main security desk.',
      preferredDate: data.preferredDate || '2026-09-22',
      preferredTime: data.preferredTime || 'Morning',
      flexibility: data.flexibility || '± 1 Day',
      duration: data.duration || '1 Day',
      attachments: data.attachments || ['site_spec.pdf'],
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'QUOTATION RECEIVED',
    };

    const propId = `PROP-2026-00${Math.floor(10 + Math.random() * 89)}`;
    const isOver1k = (data.service === 'HVAC & AC' || data.service === 'Electrical');
    const total = isOver1k ? 1750 : 850;
    const upfrontPct = total > 1000 ? 60 : 100;
    const upfrontAmt = Math.round((total * upfrontPct) / 100);
    const balAmt = total - upfrontAmt;

    const newProp: ProposalItem = {
      id: propId,
      requestId: reqId,
      providerName: 'PrimeCare Facilities Ltd',
      service: newReq.service,
      projectTitle: newReq.projectTitle,
      siteName: `${newReq.siteName}, ${newReq.city}`,
      scheduledDate: newReq.preferredDate,
      estimatedDuration: newReq.duration,
      scopeOfWork: [
        `Full ${newReq.service} inspection & diagnostics`,
        'Execution of requested specifications',
        'Safety compliance check & digital work report',
      ],
      whatsIncluded: [
        'Certified Category Engineers',
        'All equipment & materials included',
        'Comprehensive warranty coverage',
      ],
      laborCost: Math.round(total * 0.55),
      materialsCost: Math.round(total * 0.25),
      equipmentCost: Math.round(total * 0.12),
      transportCost: Math.round(total * 0.08),
      totalQuote: total,
      upfrontPercentage: upfrontPct,
      upfrontAmount: upfrontAmt,
      balancePercentage: 100 - upfrontPct,
      balanceAmount: balAmt,
      status: 'PENDING',
    };

    setRequests(prev => [newReq, ...prev]);
    setProposals(prev => [newProp, ...prev]);

    addNotification(
      'Request Submitted',
      `Your request ${reqId} has been submitted successfully.`,
      '/requester/requests'
    );

    setTimeout(() => {
      addNotification(
        'New Quotation Received',
        `PrimeCare Facilities Ltd submitted a quotation (£${total.toLocaleString()}) for ${reqId}.`,
        `/requester/proposal/${propId}`
      );
    }, 400);

    return reqId;
  };

  const acceptProposal = (proposalId: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'ACCEPTED' } : p));
    setRequests(prev => prev.map(r => r.id === prop.requestId ? { ...r, status: 'AWAITING PAYMENT' } : r));

    const projId = `FX-PROJ-${prop.requestId.replace('REQ-2026-', '')}`;
    const isOver1k = prop.totalQuote > 1000 || prop.balanceAmount > 0;

    const timeline = isOver1k ? [
      { title: 'Request Submitted', date: 'Done', completed: true },
      { title: 'Quotation Received', date: 'Done', completed: true },
      { title: 'Quotation Accepted', date: 'Done', completed: true },
      { title: 'Upfront Payment', date: 'Pending', completed: false },
      { title: 'Project Confirmed', date: 'Pending', completed: false },
      { title: 'Work Started', date: 'Pending', completed: false },
      { title: 'Completed', date: 'Pending', completed: false },
      { title: 'Final Payment', date: 'Pending', completed: false },
      { title: 'Review', date: 'Pending', completed: false },
    ] : [
      { title: 'Request Submitted', date: 'Done', completed: true },
      { title: 'Quotation Received', date: 'Done', completed: true },
      { title: 'Quotation Accepted', date: 'Done', completed: true },
      { title: 'Full Upfront Payment', date: 'Pending', completed: false },
      { title: 'Project Confirmed', date: 'Pending', completed: false },
      { title: 'Work Started', date: 'Pending', completed: false },
      { title: 'Completed', date: 'Pending', completed: false },
      { title: 'Review', date: 'Pending', completed: false },
    ];

    const newProj: ProjectItem = {
      id: projId,
      requestId: prop.requestId,
      proposalId: prop.id,
      projectName: prop.projectTitle,
      service: prop.service,
      providerName: prop.providerName,
      location: prop.siteName,
      scheduledDate: prop.scheduledDate,
      totalValue: prop.totalQuote,
      upfrontAmount: prop.upfrontAmount,
      balanceAmount: prop.balanceAmount,
      upfrontPaid: false,
      balancePaid: prop.balanceAmount === 0,
      paymentStatus: 'AWAITING UPFRONT',
      status: 'CONFIRMED',
      timeline,
      updates: [
        { text: 'Proposal accepted by client. Awaiting upfront payment.', timestamp: 'Just now', author: 'System' },
      ],
    };

    setProjects(prev => [newProj, ...prev]);

    addNotification(
      'Quotation Accepted',
      `You accepted the quotation for ${prop.projectTitle}.`,
      `/requester/payment/${projId}`
    );

    addNotification(
      'Payment Required',
      `Upfront payment (£${prop.upfrontAmount.toLocaleString()}) is ready for ${projId}.`,
      `/requester/payment/${projId}`
    );
  };

  const rejectProposal = (proposalId: string) => {
    setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'REJECTED' } : p));
  };

  const payUpfront = (projectId: string, _cardData: any) => {
    const txId = `TXN-UP-${Math.floor(100000 + Math.random() * 900000)}`;
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedTimeline = p.timeline.map((step, idx) => {
            if (idx <= 4) return { ...step, completed: true, date: 'Done' };
            return step;
          });
          const hasBalance = p.balanceAmount > 0;
          return {
            ...p,
            upfrontPaid: true,
            upfrontTxId: txId,
            paymentStatus: hasBalance ? 'BALANCE DUE' : 'FULLY PAID',
            status: 'CONFIRMED',
            timeline: updatedTimeline,
            updates: [
              ...p.updates,
              { text: `Upfront payment of £${p.upfrontAmount.toLocaleString()} received (TXN: ${txId}). Project confirmed.`, timestamp: 'Just now', author: 'System' },
            ],
          };
        }
        return p;
      })
    );

    setRequests(prev =>
      prev.map(r => (projects.find(p => p.id === projectId)?.requestId === r.id ? { ...r, status: 'CONFIRMED' } : r))
    );

    addNotification(
      'Payment Successful',
      `Upfront payment of £${projects.find(p => p.id === projectId)?.upfrontAmount.toLocaleString()} was successful.`,
      `/requester/project/${projectId}`
    );

    addNotification(
      'Project Confirmed',
      `PrimeCare Facilities Ltd has scheduled your project for execution.`,
      `/requester/project/${projectId}`
    );
  };

  const simulateWorkStarted = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedTimeline = p.timeline.map((step, idx) => {
            if (idx <= 5) return { ...step, completed: true, date: 'Done' };
            return step;
          });
          return {
            ...p,
            status: 'WORK STARTED',
            timeline: updatedTimeline,
            updates: [
              ...p.updates,
              { text: 'Provider team has arrived on site and commenced work execution.', timestamp: 'Just now', author: 'PrimeCare Facilities Ltd' },
            ],
          };
        }
        return p;
      })
    );

    setRequests(prev =>
      prev.map(r => (projects.find(p => p.id === projectId)?.requestId === r.id ? { ...r, status: 'WORK STARTED' } : r))
    );

    addNotification(
      'Work Started',
      `PrimeCare Facilities Ltd has started work on ${projectId}.`,
      `/requester/project/${projectId}`
    );
  };

  const simulateProjectUpdate = (projectId: string, text = 'HVAC diagnostic & filter replacement completed on Floor 1 & 2.') => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'IN PROGRESS',
            updates: [
              ...p.updates,
              { text, timestamp: 'Just now', author: 'PrimeCare Facilities Ltd' },
            ],
          };
        }
        return p;
      })
    );

    addNotification(
      'Project Update',
      `PrimeCare Facilities Ltd posted a project update for ${projectId}.`,
      `/requester/project/${projectId}`
    );
  };

  const simulateProjectCompleted = (projectId: string) => {
    const targetProj = projects.find(p => p.id === projectId);
    const needsBalance = targetProj ? (targetProj.totalValue > 1000 || targetProj.balanceAmount > 0) : false;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedTimeline = p.timeline.map((step, idx) => {
            if (idx <= 6) return { ...step, completed: true, date: 'Done' };
            return step;
          });
          return {
            ...p,
            status: needsBalance ? 'BALANCE PAYMENT DUE' : 'COMPLETED',
            paymentStatus: needsBalance ? 'BALANCE DUE' : 'FULLY PAID',
            timeline: updatedTimeline,
            workSummary: 'All requested project scope executed, tested & certified to OEM standards.',
            completedPhotos: [
              'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
            ],
            pdfReportUrl: `Fixora_Completion_Cert_${projectId.replace('FX-PROJ-', '')}.pdf`,
            updates: [
              ...p.updates,
              { text: 'Project marked as COMPLETED by provider. Digital completion certificate uploaded.', timestamp: 'Just now', author: 'PrimeCare Facilities Ltd' },
            ],
          };
        }
        return p;
      })
    );

    setRequests(prev =>
      prev.map(r => (targetProj?.requestId === r.id ? { ...r, status: needsBalance ? 'BALANCE PAYMENT DUE' : 'COMPLETED' } : r))
    );

    if (needsBalance && targetProj) {
      addNotification(
        'Project Completed',
        `PrimeCare Facilities Ltd marked project ${projectId} as completed.`,
        `/requester/completion/${projectId}`
      );
      addNotification(
        'Balance Payment Due',
        `Remaining 40% balance (£${targetProj.balanceAmount.toLocaleString()}) is now due for ${projectId}.`,
        `/requester/final-payment/${projectId}`
      );
    } else if (targetProj) {
      addNotification(
        'Project Completed',
        `PrimeCare Facilities Ltd has completed your project.`,
        `/requester/completion/${projectId}`
      );
      addNotification(
        'Review Your Provider',
        `Your project ${projectId} is complete. Share your experience with PrimeCare Facilities Ltd.`,
        `/requester/review/${projectId}`
      );
    }
  };

  const payBalance = (projectId: string, _cardData: any) => {
    const txId = `TXN-BAL-${Math.floor(100000 + Math.random() * 900000)}`;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedTimeline = p.timeline.map((step, idx) => {
            if (idx <= 7) return { ...step, completed: true, date: 'Done' };
            return step;
          });
          return {
            ...p,
            balancePaid: true,
            balanceTxId: txId,
            paymentStatus: 'FULLY PAID',
            status: 'COMPLETED',
            timeline: updatedTimeline,
            updates: [
              ...p.updates,
              { text: `Final 40% balance payment of £${p.balanceAmount.toLocaleString()} received (TXN: ${txId}).`, timestamp: 'Just now', author: 'System' },
            ],
          };
        }
        return p;
      })
    );

    setRequests(prev =>
      prev.map(r => (projects.find(p => p.id === projectId)?.requestId === r.id ? { ...r, status: 'PAYMENT COMPLETED' } : r))
    );

    addNotification(
      'Payment Successful',
      `Final balance payment of £${projects.find(p => p.id === projectId)?.balanceAmount.toLocaleString()} received.`,
      `/requester/review/${projectId}`
    );

    addNotification(
      'Review Your Provider',
      `Your project ${projectId} is complete. Share your experience with PrimeCare Facilities Ltd.`,
      `/requester/review/${projectId}`
    );
  };

  const submitReview = (projectId: string, reviewData: any) => {
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      projectId,
      providerName: 'PrimeCare Facilities Ltd',
      overallRating: reviewData.overallRating || 5,
      qualityRating: reviewData.qualityRating || 5,
      communicationRating: reviewData.communicationRating || 5,
      timelinessRating: reviewData.timelinessRating || 5,
      professionalismRating: reviewData.professionalismRating || 5,
      valueRating: reviewData.valueRating || 5,
      writtenFeedback: reviewData.writtenFeedback || 'Outstanding work! Punctual, clean execution and great communication.',
      recommend: reviewData.recommend !== false,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setReviews(prev => [newRev, ...prev]);

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedTimeline = p.timeline.map(step => ({ ...step, completed: true, date: 'Done' }));
          return {
            ...p,
            status: 'CLOSED',
            timeline: updatedTimeline,
            updates: [
              ...p.updates,
              { text: 'Requester review submitted. Project successfully CLOSED.', timestamp: 'Just now', author: 'System' },
            ],
          };
        }
        return p;
      })
    );

    setRequests(prev =>
      prev.map(r => (projects.find(p => p.id === projectId)?.requestId === r.id ? { ...r, status: 'CLOSED' } : r))
    );

    addNotification(
      'Review Submitted',
      'Thank you for reviewing your provider. Project is now CLOSED.',
      `/requester/projects`
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemo = () => {
    localStorage.removeItem('fixora_demo_logged_in');
    localStorage.removeItem('fixora_demo_requests');
    localStorage.removeItem('fixora_demo_proposals');
    localStorage.removeItem('fixora_demo_projects');
    localStorage.removeItem('fixora_demo_notifications');
    localStorage.removeItem('fixora_demo_reviews');

    setIsLoggedIn(true);
    setRequests(INITIAL_REQUESTS);
    setProposals(INITIAL_PROPOSALS);
    setProjects([]);
    setNotifications(INITIAL_NOTIFICATIONS);
    setReviews([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DemoContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        requests,
        proposals,
        projects,
        notifications,
        reviews,
        createRequest,
        acceptProposal,
        rejectProposal,
        payUpfront,
        simulateWorkStarted,
        simulateProjectUpdate,
        simulateProjectCompleted,
        payBalance,
        submitReview,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetDemo,
        unreadCount,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
