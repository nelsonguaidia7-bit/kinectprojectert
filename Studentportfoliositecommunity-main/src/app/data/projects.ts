export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  author: {
    name: string;
    bio: string;
    avatar: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  details: {
    year: string;
    role: string;
    tools: string[];
  };
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Featured Student Portfolios",
    category: "Portfolio Showcase",
    description: "A featured gallery of Graceland-inspired student work across technology, design, research, and leadership projects.",
    coverImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Graceland Student Community",
      bio: "Curated to highlight student talent, growth, and impact across campus life and academics.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Student Community Feature",
      tools: ["Portfolio", "Mentorship", "Networking", "Feedback"],
    },
  },
  {
    id: "2",
    title: "Academic Resources and Tutoring",
    category: "Academic Support",
    description: "A central space for study resources, peer tutoring, course planning, and academic success pathways for Graceland students.",
    coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Student Success Center",
      bio: "Built to strengthen performance, planning, and confidence throughout the semester.",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Academic Mentorship",
      tools: ["Tutoring", "Study Groups", "Time Management", "Office Hours"],
    },
  },
  {
    id: "3",
    title: "Scholarships, Internships, and Jobs",
    category: "Career Development",
    description: "A practical hub for scholarships, internship opportunities, and student employment aligned with long-term career goals.",
    coverImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Career Services Graceland",
      bio: "Connecting students with real opportunities, professional exposure, and career momentum.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Career Guidance",
      tools: ["CV Review", "Internships", "Job Board", "Interview Prep"],
    },
  },
  {
    id: "4",
    title: "Student Life and Clubs",
    category: "Campus Community",
    description: "A vibrant view of clubs, campus events, and student-led initiatives that encourage leadership and belonging.",
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Student Organizations Office",
      bio: "Designed to support an active, inclusive, and connected student experience.",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Campus Engagement",
      tools: ["Events", "Clubs", "Service", "Leadership"],
    },
  },
  {
    id: "5",
    title: "Student Wellness Center",
    category: "Wellness",
    description: "Resources for physical health, mental wellness, counseling, and life-academic balance tailored for students.",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Student Wellness Team",
      bio: "Supporting students with practical wellness tools throughout their college journey.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Wellness Support",
      tools: ["Counseling", "Peer Support", "Workshops", "Mindfulness"],
    },
  },
  {
    id: "6",
    title: "Collaborative Workspace",
    category: "Team Projects",
    description: "A collaborative zone for interdisciplinary student teams to build, iterate, and present impactful projects.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    author: {
      name: "Collaborative Lab",
      bio: "Built for teamwork, project planning, and real problem-solving across majors.",
      avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      linkedin: "https://www.linkedin.com/school/graceland-university/",
    },
    details: {
      year: "2026",
      role: "Collaborative Project",
      tools: ["Teams", "Notion", "Presentations", "Peer Review"],
    },
  },
];
