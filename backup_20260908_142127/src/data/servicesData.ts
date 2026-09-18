import { Wrench, Droplets, Zap, Wind, Sparkles, Paintbrush, Bug, ShieldCheck } from 'lucide-react';
import type { ServiceData } from '../components/ServiceDetailPanel';

export const servicesData: ServiceData[] = [
  {
    num: '01',
    title: 'PROPERTY MAINTENANCE',
    tagline: 'Keep your property running smoothly with reliable everyday maintenance.',
    tasks: ['General Handyman', 'Fixture Installation', 'Hardware Replacement', 'Preventative Inspections'],
    icon: Wrench,
    badge: 'Continuous Upkeep',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Our property maintenance team provides comprehensive upkeep services to ensure your property remains in excellent condition year-round.',
      included: ['General Handyman Work', 'Fixture Installation', 'Hardware Replacement', 'Preventative Inspections', 'Door & Window Repairs', 'Flooring Fixes', 'Gutter Cleaning', 'Minor Structural Repairs'],
      suitable: ['Homes', 'Offices', 'Commercial', 'Managed Properties'],
      responseTime: 'Within 24 hours',
      guarantee: '30-day workmanship guarantee',
    }
  },
  {
    num: '02',
    title: 'PLUMBING',
    tagline: 'From leaking taps to complete plumbing repairs, FIXORA keeps your property running smoothly.',
    tasks: ['Leak Repair', 'Pipe Work', 'Bathroom Repair', 'Water Systems'],
    icon: Droplets,
    badge: '24/7 Response',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Expert plumbing solutions for every situation — from emergency leak repairs to complete bathroom installations.',
      included: ['Leak Detection & Repair', 'Pipe Installation & Replacement', 'Bathroom & Kitchen Repairs', 'Water Pressure Issues', 'Boiler Checks', 'Drain Unblocking', 'Toilet Repairs', 'Tap Replacement'],
      suitable: ['Homes', 'Offices', 'Commercial'],
      responseTime: 'Emergency: 2–4 hours',
      guarantee: '60-day parts & labour guarantee',
    }
  },
  {
    num: '03',
    title: 'ELECTRICAL',
    tagline: 'Reliable electrical support for everyday problems and essential property systems.',
    tasks: ['Electrical Repairs', 'Lighting', 'Wiring', 'Power Issues'],
    icon: Zap,
    badge: 'Certified Electricians',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Our certified electricians provide safe, compliant electrical services across all property types.',
      included: ['Fault Finding & Repair', 'Lighting Installation', 'Consumer Unit Upgrades', 'Socket & Switch Installation', 'EV Charger Installation', 'PAT Testing', 'Emergency Lighting', 'Wiring Inspection (EICR)'],
      suitable: ['Homes', 'Offices', 'Commercial', 'Managed Properties'],
      responseTime: 'Same day or next day',
      guarantee: 'Full Part P compliance',
    }
  },
  {
    num: '04',
    title: 'HVAC & AC',
    tagline: 'Keep your spaces comfortable with dependable heating, cooling and AC support.',
    tasks: ['AC Service', 'AC Repair', 'HVAC Maintenance', 'Installation'],
    icon: Wind,
    badge: 'Climate Control',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e4bf0b3e?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Keep your property at the perfect temperature all year round with expert heating and cooling specialists.',
      included: ['AC Servicing & Repair', 'Gas Central Heating', 'Boiler Installation & Service', 'Underfloor Heating', 'Heat Pump Systems', 'Ventilation Improvement', 'Smart Thermostat Setup', 'Annual Service Contracts'],
      suitable: ['Homes', 'Offices', 'Commercial'],
      responseTime: 'Within 48 hours',
      guarantee: 'Annual service contracts available',
    }
  },
  {
    num: '05',
    title: 'CLEANING',
    tagline: 'Professional cleaning that keeps every space fresh, healthy and ready.',
    tasks: ['Deep Cleaning', 'Regular Cleaning', 'Move-in Cleaning', 'Commercial Cleaning'],
    icon: Sparkles,
    badge: 'Sanitised & Ready',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'From one-off deep cleans to recurring maintenance cleaning, our professional teams use eco-friendly products.',
      included: ['Deep Cleaning', 'Regular Maintenance Cleaning', 'End-of-Tenancy Cleaning', 'Move-in/Move-out Cleaning', 'Office & Commercial Cleaning', 'Carpet & Upholstery Cleaning', 'Window Cleaning', 'After-Build Cleaning'],
      suitable: ['Homes', 'Offices', 'Commercial', 'Managed Properties'],
      responseTime: 'Book 24 hours in advance',
      guarantee: 'Satisfaction re-clean guarantee',
    }
  },
  {
    num: '06',
    title: 'PAINTING',
    tagline: 'Refresh and protect your property with professional painting and finishing.',
    tasks: ['Interior Painting', 'Exterior Painting', 'Wall Finishing', 'Touch-ups'],
    icon: Paintbrush,
    badge: 'Precision Finish',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Transform your property with expert painting and decorating services using premium paints.',
      included: ['Full Interior Painting', 'Exterior & Render Painting', 'Feature Walls', 'Wallpaper Hanging', 'Skirting & Coving', 'Touch-up & Patch Repairs', 'Commercial Redecorating', 'Colour Consultation'],
      suitable: ['Homes', 'Offices', 'Commercial'],
      responseTime: 'Project quote within 48 hours',
      guarantee: '2-year finish guarantee',
    }
  },
  {
    num: '07',
    title: 'PEST CONTROL',
    tagline: 'Protect your property from unwanted pests with professional treatment.',
    tasks: ['Inspection', 'Treatment', 'Prevention', 'Follow-up'],
    icon: Bug,
    badge: 'Eco Protection',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Discreet, effective pest control solutions that protect your property and its occupants.',
      included: ['Pest Inspection & Survey', 'Rodent Control', 'Insect Treatments', 'Bird Proofing', 'Wasp & Bee Removal', 'Bed Bug Treatment', 'Prevention Advice', '3-Month Follow-up Visits'],
      suitable: ['Homes', 'Offices', 'Commercial', 'Managed Properties'],
      responseTime: 'Within 24–48 hours',
      guarantee: '3-month re-treatment guarantee',
    }
  },
  {
    num: '08',
    title: 'SECURITY',
    tagline: 'Keep your property protected with reliable security solutions.',
    tasks: ['Security Systems', 'CCTV', 'Access Control', 'Property Protection'],
    icon: ShieldCheck,
    badge: 'Smart Guard',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    detail: {
      description: 'Comprehensive security solutions from CCTV installation to smart access control systems.',
      included: ['CCTV Installation & Monitoring', 'Smart Alarm Systems', 'Door Access Control', 'Smart Locks & Video Doorbells', 'Security Lighting', 'Fire Detection Systems', 'Remote Monitoring Setup', 'Security Audit'],
      suitable: ['Homes', 'Offices', 'Commercial', 'Managed Properties'],
      responseTime: 'Site survey within 48 hours',
      guarantee: '12-month equipment warranty',
    }
  }
];
