export interface ProductCategory {
  slug: string;
  name: string;
  ata: string;          // ATA chapter reference (aviation taxonomy)
  tagline: string;
  description: string;
  features: string[];
  applications: string[];
}

export const products: ProductCategory[] = [
  {
    slug: 'airframe-spare-parts',
    name: 'Airframe Spare Parts',
    ata: 'ATA 51–57',
    tagline: 'Structural components and airframe hardware, traceable to source.',
    description:
      'VANDEX supplies airframe structural parts, skins, panels, doors, and flight-control surfaces for commercial and regional fleets. Every unit ships with full back-to-birth or last-operator traceability and release documentation accepted by EASA, FAA, and GCAA-regulated operators.',
    features: ['FAA 8130-3 / EASA Form 1 release', 'New, OH, SV, and AR conditions', 'Serialized traceability', 'Fleet-specific sourcing programs'],
    applications: ['Airbus A320/A330 family', 'Boeing 737/777 family', 'Regional and turboprop fleets', 'Cargo conversions'],
  },
  {
    slug: 'avionics',
    name: 'Avionics & Instruments',
    ata: 'ATA 22–34',
    tagline: 'Flight management, navigation, communication, and display units.',
    description:
      'From FMCs and transponders to weather radar and integrated display units, VANDEX sources certified avionics with verified mod status and shop reports, supporting retrofit programs and line-maintenance exchanges alike.',
    features: ['Verified mod status', 'Bench-tested with shop reports', 'Exchange and outright options', 'OEM and PMA sources'],
    applications: ['Cockpit retrofits', 'Line maintenance exchanges', 'NAV/COM upgrades', 'ADS-B compliance programs'],
  },
  {
    slug: 'hydraulic-components',
    name: 'Hydraulic Components',
    ata: 'ATA 29',
    tagline: 'Pumps, actuators, valves, and reservoirs for every pressure system.',
    description:
      'VANDEX maintains deep sourcing for engine-driven pumps, electric pumps, PTUs, actuators, and hydraulic valves (the components that ground aircraft fastest when they fail). Our AOG desk prioritizes hydraulic requests.',
    features: ['AOG priority handling', 'Overhauled with full shop findings', 'Hose and fitting programs', 'Serviceable exchange pool access'],
    applications: ['Primary flight controls', 'Landing gear actuation', 'Braking systems', 'Cargo door systems'],
  },
  {
    slug: 'landing-gear',
    name: 'Landing Gear & Wheels',
    ata: 'ATA 32',
    tagline: 'Gear assemblies, wheels, brakes, and steering components.',
    description:
      'Complete landing gear assemblies, shock struts, wheels, brake units, and anti-skid components sourced against cycle limits. Full life records delivered so your planning team can slot parts directly into check packages.',
    features: ['Cycle and life-limit verification', 'Gear exchange programs', 'Wheel and brake pool support', 'Chrome and OH condition options'],
    applications: ['Heavy checks and gear swaps', 'Wheel & brake consumption programs', 'Lease-return preparation', 'AOG gear events'],
  },
  {
    slug: 'engine-components',
    name: 'Engine Components',
    ata: 'ATA 72–80',
    tagline: 'LRUs, QEC hardware, and engine accessories for major platforms.',
    description:
      'VANDEX supports CFM56, LEAP, V2500, PW1100G, and GE90 operators with fuel controls, ignition systems, starters, sensors, and QEC components. Disk and blade trading is handled under strict document review.',
    features: ['Strict trace and non-incident statements', 'LLP document review protocol', 'Boroscope-supported condition reports', 'Engine teardown channel access'],
    applications: ['Engine shop visits', 'QEC build-up', 'On-wing maintenance', 'LRU exchange programs'],
  },
  {
    slug: 'electrical-systems',
    name: 'Electrical Systems',
    ata: 'ATA 24 / 33',
    tagline: 'Power generation, distribution, batteries, and lighting.',
    description:
      'Generators, TRUs, static inverters, batteries, contactors, and interior or exterior lighting supplied with capacity test results and shelf-life verification. Everything arrives ready to install.',
    features: ['Capacity-tested batteries', 'Shelf-life reporting', 'LED retrofit sourcing', 'Harness and connector programs'],
    applications: ['Power system maintenance', 'Cabin and exterior lighting', 'Battery replacement cycles', 'Retrofit modifications'],
  },
  {
    slug: 'cabin-equipment',
    name: 'Cabin Interiors & Equipment',
    ata: 'ATA 25',
    tagline: 'Seats, galleys, lavatory hardware, and emergency equipment.',
    description:
      'VANDEX sources cabin hardware from seat actuation and IFE components to galley inserts, oxygen equipment, slides, and vests. Burn certificates and DOM verification are handled before quotation, not after delivery.',
    features: ['Flammability certification on file', 'DOM and expiry verification', 'Slide and raft repair routing', 'Cabin refurbishment kits'],
    applications: ['Cabin refurbishment', 'Emergency equipment replacement', 'Galley and lavatory maintenance', 'Seat programs'],
  },
  {
    slug: 'fasteners-hardware',
    name: 'Fasteners & Standard Hardware',
    ata: 'NAS / MS / AN / BAC',
    tagline: 'Certified aerospace hardware in program quantities.',
    description:
      'Hi-Loks, rivets, bolts, nuts, washers, clamps, and bearings to NAS, MS, AN, and BAC standards. Batch-traceable with mill certificates and manufacturer CoCs, packaged for stores-ready receiving.',
    features: ['Batch traceability with mill certs', 'Kitting to work-order level', 'Min/max replenishment programs', 'Counterfeit-part screening'],
    applications: ['Structures and heavy checks', 'Line maintenance stock', 'Kitting for modifications', 'Stores replenishment'],
  },
  {
    slug: 'consumables-expendables',
    name: 'Consumables & Expendables',
    ata: 'CHEM / EXP',
    tagline: 'Chemicals, sealants, lubricants, filters, and expendables.',
    description:
      'Shelf-life-managed supply of sealants, adhesives, lubricants, hydraulic fluid, filters, O-rings, and gaskets. Cold-chain handling where required and remaining-life guarantees agreed at order.',
    features: ['Minimum 75% shelf life on delivery', 'Cold-chain and hazmat handling', 'SDS documentation included', 'Scheduled consumption programs'],
    applications: ['Base and line maintenance', 'Composite repair shops', 'Paint and sealing operations', 'Component workshops'],
  },
  {
    slug: 'rotables',
    name: 'Rotables & Exchange Units',
    ata: 'POOL',
    tagline: 'High-value rotable inventory with flexible exchange terms.',
    description:
      'Access a managed pool of high-demand rotables across ATA chapters with outright, exchange, flat-rate exchange, and loan structures. Keep your capital in the fleet, not on the shelf.',
    features: ['Exchange, loan, and outright terms', 'Core return management', 'Repair administration included', 'Pool access agreements'],
    applications: ['Component support agreements', 'AOG exchanges', 'Working capital reduction', 'Fleet entry-into-service'],
  },
  {
    slug: 'oem-parts',
    name: 'OEM Parts',
    ata: 'OEM',
    tagline: 'Factory-new parts direct from manufacturer channels.',
    description:
      'Through established OEM and authorized-distributor relationships, VANDEX procures factory-new components with manufacturer certification. Consolidate multi-OEM orders into a single delivery and invoice.',
    features: ['Manufacturer CoC on every line', 'Multi-OEM order consolidation', 'Lead-time monitoring and expediting', 'Warranty administration'],
    applications: ['New aircraft entry-into-service', 'Warranty-sensitive replacements', 'Mod and SB embodiment', 'Provisioning programs'],
  },
  {
    slug: 'aftermarket-parts',
    name: 'Aftermarket & Surplus',
    ata: 'SURPLUS',
    tagline: 'Cost-efficient serviceable material from vetted channels.',
    description:
      'Teardown, surplus, and aftermarket material sourced only from audited vendors, inspected against ASA-100 aligned receiving standards, and priced to cut material cost without cutting corners on trace.',
    features: ['Audited vendor network only', 'ASA-100 aligned receiving inspection', 'Teardown project channels', 'Significant cost savings vs list'],
    applications: ['Mature fleet support', 'Cost-reduction programs', 'End-of-lease economics', 'Cargo operator fleets'],
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
