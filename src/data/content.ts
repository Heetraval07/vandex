import type { LucideIcon } from 'lucide-react';
import {
  Globe2, Search, Siren, Boxes, Plane, FileCheck2, Handshake, Wrench, GitBranch,
} from 'lucide-react';

export interface Service {
  slug: string; name: string; icon: LucideIcon; short: string; description: string; points: string[];
}

export const services: Service[] = [
  { slug: 'global-procurement', name: 'Global Procurement', icon: Globe2,
    short: 'One purchase order, worldwide sourcing reach.',
    description: 'VANDEX consolidates your material demand into a single procurement channel, sourcing across OEM, distributor, and surplus markets in the Americas, Europe, and Asia. We deliver to your dock with unified documentation.',
    points: ['Multi-market RFQ management', 'Single-invoice consolidation', 'Price benchmarking against market data', 'Long-lead-item monitoring'] },
  { slug: 'parts-sourcing', name: 'Aircraft Parts Sourcing', icon: Search,
    short: 'Hard-to-find part numbers, located and verified.',
    description: 'Our sourcing desk locates scarce and out-of-production part numbers through teardown channels, operator surplus, and OEM alternates. Airworthiness documentation is verified before we quote.',
    points: ['Alternate P/N and interchangeability research', 'Out-of-production sourcing', 'Document review before quotation', 'Condition and trace verification'] },
  { slug: 'aog-support', name: 'Emergency AOG Support', icon: Siren,
    short: '24/7 desk. Quote in minutes, parts on the next flight out.',
    description: 'When an aircraft is on ground, VANDEX activates a dedicated AOG protocol: immediate sourcing across time zones, hand-carry and NFO logistics, and live status updates until the part is at your hangar door.',
    points: ['24/7/365 AOG desk', 'Next-flight-out and hand-carry options', 'Live shipment tracking updates', 'Priority customs pre-clearance'] },
  { slug: 'inventory-management', name: 'Inventory Management', icon: Boxes,
    short: 'Consignment, min/max, and pool programs that free capital.',
    description: 'VANDEX designs inventory programs (consignment stock, min/max replenishment, rotable pools) that cut carrying cost while lifting service levels. Consumption analytics are reviewed quarterly.',
    points: ['Consignment stock at your station', 'Min/max replenishment automation', 'Consumption analytics and forecasting', 'Obsolescence and surplus disposition'] },
  { slug: 'worldwide-logistics', name: 'Worldwide Logistics', icon: Plane,
    short: 'Door-to-door aviation logistics from a Dubai hub.',
    description: 'VANDEX moves material door-to-door with DG-certified packing, temperature-controlled handling, and routing built around your maintenance slot, not the forwarder\u2019s schedule.',
    points: ['IATA DG-certified handling', 'Temperature and shock-controlled packing', 'Door-to-door incoterm flexibility', 'Dubai hub with global lanes'] },
  { slug: 'export-documentation', name: 'Export Documentation', icon: FileCheck2,
    short: 'Compliance-clean paperwork, every shipment.',
    description: 'Every VANDEX shipment includes complete, compliant documentation: release certificates, export licences, EUC handling, and customs paperwork. Our team is fluent in UAE, EU, and US export regimes.',
    points: ['FAA 8130-3 / EASA Form 1 management', 'Export control and sanctions screening', 'End-use certificate administration', 'Customs documentation packs'] },
  { slug: 'vendor-management', name: 'Vendor Management', icon: Handshake,
    short: 'An audited network, so you deal with one counterparty.',
    description: 'We maintain and audit a global vendor network against ASA-100 aligned criteria: quality, delivery performance, and documentation accuracy. One VANDEX account replaces dozens of supplier files.',
    points: ['Vendor audits and scorecards', 'Counterfeit-part prevention program', 'Single counterparty, consolidated risk', 'Quality escape investigation'] },
  { slug: 'technical-consultation', name: 'Technical Consultation', icon: Wrench,
    short: 'Engineering-level answers to material questions.',
    description: 'Our technical team supports interchangeability decisions, SB/AD material planning, and lease-return reviews. We turn IPC ambiguity into confident purchase decisions.',
    points: ['IPC and interchangeability analysis', 'SB / AD material planning', 'Lease-return record review', 'Repair vs replace economics'] },
  { slug: 'supply-chain-management', name: 'Supply Chain Management', icon: GitBranch,
    short: 'End-to-end material programs for fleets and MROs.',
    description: 'For operators who want material off their desk entirely, VANDEX handles the full chain: forecasting, purchasing, warehousing, repairs administration, and delivery. All under one KPI-governed agreement.',
    points: ['KPI-governed supply agreements', 'Forecasting and demand planning', 'Repair order administration', 'Dedicated program manager'] },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export interface Industry { name: string; text: string; }
export const industries: Industry[] = [
  { name: 'Commercial Airlines', text: 'Line and base maintenance support for narrowbody, widebody, and regional fleets, from routine replenishment to AOG recovery.' },
  { name: 'MRO Facilities', text: 'Component supply for scheduled checks, consolidated to your input schedule.' },
  { name: 'Charter & Business Aviation', text: 'Fast-turn support for operators whose aircraft cannot wait on a standard lead time.' },
  { name: 'Distributors & Traders', text: 'A sourcing partner for lines you do not hold, with documentation that clears your customers’ inspection.' },
  { name: 'Aerospace Manufacturers', text: 'Supply-chain support for production and aftermarket programs, including hard-to-find and obsolete items.' },
];
