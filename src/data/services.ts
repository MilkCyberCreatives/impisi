export type ServiceDetailSection = {
  heading: string;
  bullets: string[];
};

export type ServiceItem = {
  slug: string;
  title: string;
  subtitle: string;
  image: string; // /public path
  summary: string;
  highlights: string[];
  sections: ServiceDetailSection[];
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "mining-operations",
    title: "Mining Operations",
    subtitle: "Development, management and optimisation",
    image: "/hero/service-mining.jpg",
    summary:
      "Impisi Resources is actively involved in the development, management, and optimisation of mining operations, primarily within open-pit and near-surface environments suited to bulk commodity extraction.",
    highlights: [
      "Open-pit and near-surface environments",
      "Grade control and blending discipline",
      "Mine-to-plant production alignment",
    ],
    sections: [
      {
        heading: "Mining Models",
        bullets: [
          "Owner-Operated Mining",
          "Contract Mining & Joint Ventures",
          "Pre-Funded Mining Structures",
        ],
      },
      {
        heading: "Operational Capabilities",
        bullets: [
          "Open-pit and free-dig mining",
          "Drill-and-blast operations where required",
          "Selective mining and grade control",
          "ROM stockpile management and blending",
          "Mine-to-plant production alignment",
          "Equipment coordination and fleet management",
        ],
      },
      {
        heading: "Alignment to Beneficiation",
        bullets: [
          "Mining plans aligned directly to beneficiation requirements",
          "Consistent feed quality and operational stability focus",
        ],
      },
    ],
  },
  {
    slug: "exploration-resource-development",
    title: "Exploration & Resource Development",
    subtitle: "Commercially focused, risk-managed strategy",
    image: "/hero/service-logistics.jpg",
    summary:
      "Exploration underpins long-term growth and reserve sustainability. Impisi Resources adopts a commercially focused, risk-managed exploration strategy aimed at fast-tracking viable resources into production.",
    highlights: [
      "Brownfield and near-mine extensions",
      "Rapid transition from exploration to production",
      "Metallurgical and washability testing",
    ],
    sections: [
      {
        heading: "Exploration Focus",
        bullets: [
          "Brownfield and near-mine extensions",
          "Shallow, laterally continuous ore bodies",
          "Deposits compatible with processing infrastructure",
          "Rapid transition from exploration to cash-generating operations",
        ],
      },
      {
        heading: "Exploration Activities",
        bullets: [
          "Desktop geological studies and historical data validation",
          "Geological mapping and sampling",
          "Trenching, test pitting, and bulk sampling",
          "RC and core drilling programmes",
          "Metallurgical testing and washability analysis",
          "Resource modelling and mine planning support",
        ],
      },
    ],
  },
  {
    slug: "beneficiation-processing",
    title: "Mineral Processing & Beneficiation",
    subtitle: "Wolfmountain Chrome Wash Plant capability",
    image: "/hero/service-beneficiation.jpg",
    summary:
      "Mineral processing and beneficiation form a core value creation strategy, converting run-of-mine material into market-ready products and improving recovery and concentrate quality.",
    highlights: [
      "Owned & operated beneficiation asset",
      "Recovery focus and quality control",
      "Handles ROM, fines, oversize and tailings",
    ],
    sections: [
      {
        heading: "Wolfmountain Plant Capabilities",
        bullets: [
          "Chrome ore washing and beneficiation",
          "Multi-stage crushing and screening circuits",
          "Spiral concentration and gravity separation",
          "Oversize handling and re-crushing",
          "Fine material and tailings re-treatment",
          "Product sizing, blending, and quality control",
        ],
      },
      {
        heading: "Processing Philosophy",
        bullets: [
          "Modular and scalable plant design",
          "Integrated mine-to-plant planning",
          "High uptime and yield optimisation focus",
          "Designed for ROM, fines, oversize, and tailings material",
        ],
      },
    ],
  },
  {
    slug: "commodity-trading-offtake",
    title: "Commodity Trading & Offtake",
    subtitle: "Market execution and delivery coordination",
    image: "/hero/service-trading.jpg",
    summary:
      "Impisi Resources markets and trades mineral products into domestic and international markets, leveraging relationships and market intelligence to support predictable revenue streams.",
    highlights: [
      "Long-term and spot offtake agreements",
      "Quality assurance and specification management",
      "Logistics coordination and export facilitation",
    ],
    sections: [
      {
        heading: "Commercial Capabilities",
        bullets: [
          "Long-term and spot offtake agreements",
          "Prepayment and structured offtake solutions",
          "Pricing and market optimisation",
          "Quality assurance and specification management",
          "Logistics coordination and export facilitation",
        ],
      },
    ],
  },
  {
    slug: "project-development",
    title: "Project Development",
    subtitle: "Scalable platform, disciplined execution",
    image: "/deliver.jpg",
    summary:
      "Impisi Resources is building a scalable mining and beneficiation platform focused on expanding supply security, increasing capacity, extending reserve life, and developing additional processing assets aligned with market demand and infrastructure.",
    highlights: [
      "Expanding ROM supply security",
      "Increasing beneficiation capacity",
      "Developing additional processing assets",
    ],
    sections: [
      {
        heading: "Growth Strategy",
        bullets: [
          "Expanding ROM supply security",
          "Increasing beneficiation capacity beyond Wolfmountain",
          "Extending reserve life through exploration",
          "Developing additional processing assets",
          "Regional expansion within Southern Africa",
        ],
      },
    ],
  },
  {
    slug: "logistics-supply-chain",
    title: "Logistics & Supply Chain",
    subtitle: "Efficient movement of ore and finished product",
    image: "/platform.jpg",
    summary:
      "Impisi Resources manages integrated logistics solutions to ensure efficient movement of ore and finished product, supporting reliable dispatch and delivery coordination.",
    highlights: [
      "On-site handling and dispatch management",
      "Road transport coordination",
      "Export logistics and port interface",
    ],
    sections: [
      {
        heading: "Logistics Scope",
        bullets: [
          "On-site material handling",
          "Road transport coordination",
          "Stockpile and dispatch management",
          "Export logistics and port interface",
        ],
      },
    ],
  },
  {
    slug: "governance-compliance",
    title: "Regulatory, Governance & Compliance",
    subtitle: "Compliance-first operating philosophy",
    image: "/hero/hero-main.jpg",
    summary:
      "Impisi Resources maintains internal capability in navigating South Africa’s regulatory framework, with governance, transparency, and compliance central to its operating philosophy.",
    highlights: [
      "Mining right and permit support",
      "Environmental and water processes",
      "Stakeholder and community engagement",
    ],
    sections: [
      {
        heading: "Compliance Scope",
        bullets: [
          "Mining Right and Mining Permit support",
          "Environmental Authorisations",
          "Water Use Licence processes",
          "Social and Labour Plan implementation",
          "DMRE engagement and reporting",
          "Community and landowner engagement",
        ],
      },
    ],
  },
];
