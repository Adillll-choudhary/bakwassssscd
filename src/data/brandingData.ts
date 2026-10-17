export interface BrandPillar {
    number: string;
    title: string;
    description: string;
}

export interface BrandPaletteColor {
    name: string;
    hex: string;
    textDark: boolean;
}

export interface BrandArtwork {
    id: number;
    title: string;
    caption: string;
    file: string;
    span: string;
}

export interface BrandStudyData {
    id: string;
    brandName: string;
    title: string;
    subtitlePrefix: string;
    scriptSubtitle: string;
    category: string;
    heroImage: string;
    accentColor: string;
    projectType: string;
    typography: string;
    discipline: string;
    curationCount: string;
    chapter1Title: string;
    chapter1ScriptWord: string;
    chapter1Paragraph1: string;
    chapter1Paragraph2: string;
    chapter2Title: string;
    chapter2ScriptWord: string;
    pillars: BrandPillar[];
    palette: BrandPaletteColor[];
    services: string[];
    galleryTitlePrefix: string;
    galleryScriptWord: string;
    gallery: BrandArtwork[];
    outcomeTitlePrefix: string;
    outcomeScriptWord: string;
}

export const BRAND_STUDIES: Record<string, BrandStudyData> = {
    "Selvare": {
        id: "selvare",
        brandName: "Selvare",
        title: "SELVARE",
        subtitlePrefix: "The Art of",
        scriptSubtitle: "Presence",
        category: "Luxury Fragrance House",
        heroImage: "/work/branding/selvare/selvare 1.png",
        accentColor: "#E8D8C8",
        projectType: "Self-initiated Concept",
        typography: "Cormorant Garamond and Manrope",
        discipline: "Identity, Packaging and Digital",
        curationCount: "19 Curated Assets",
        chapter1Title: "The Emotional Power of Scent and ",
        chapter1ScriptWord: "Memory",
        chapter1Paragraph1: "SELVARE is a conceptual niche fragrance house built around the emotional power of scent, memory and personal identity. The project explores how a fragrance brand can communicate understated luxury through a cohesive visual language spanning identity, packaging, product design and digital art direction.",
        chapter1Paragraph2: "To create a distinctive fragrance identity that feels sophisticated without relying on excessive ornamentation or conventional luxury clichés. The system needed to work across the perfume bottle, packaging, campaign imagery and digital experience while maintaining a recognisable visual signature.",
        chapter2Title: "The Art of ",
        chapter2ScriptWord: "Presence",
        pillars: [
            {
                number: "01",
                title: "Tactile",
                description: "Substantial rectangular glass bottle with dark wood grain cap and champagne gold accents."
            },
            {
                number: "02",
                title: "Sculptural",
                description: "Directional editorial lighting emphasizing bottle geometry, fluid clarity and amber refractions."
            },
            {
                number: "03",
                title: "Editorial",
                description: "Generous white space, architectural composition and restrained typography."
            }
        ],
        palette: [
            { name: "Ivory", hex: "#F7F5F0", textDark: true },
            { name: "Champagne", hex: "#E8D8C8", textDark: true },
            { name: "Warm Taupe", hex: "#8C7D70", textDark: false },
            { name: "Muted Olive", hex: "#6B705C", textDark: false },
            { name: "Espresso", hex: "#2B1E1A", textDark: false }
        ],
        services: [
            "Brand Strategy",
            "Visual Identity",
            "Logo Design",
            "Packaging Concept",
            "Product Art Direction",
            "Campaign Imagery",
            "Website Art Direction"
        ],
        galleryTitlePrefix: "The Selvare",
        galleryScriptWord: "Collection",
        gallery: [
            {
                id: 1,
                title: "The Signature Flacon",
                caption: "Substantial rectangular glass bottle with dark wood-grain cap and champagne-gold accents.",
                file: "/work/branding/selvare/selvare 1.png",
                span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
            },
            {
                id: 2,
                title: "Amber Tone and Reflection",
                caption: "Warm amber-toned fragrance interacting with natural atmospheric light and shadow.",
                file: "/work/branding/selvare/selvare 2.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 3,
                title: "Tactile Packaging",
                caption: "Textured paper packaging with restrained Cormorant Garamond embossing.",
                file: "/work/branding/selvare/selvare 3.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 5,
                title: "Sculptural Lighting",
                caption: "Directional editorial lighting emphasizing bottle geometry and fluid clarity.",
                file: "/work/branding/selvare/selvare 5.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 6,
                title: "Glass Reflections",
                caption: "Cinematic macro capture of liquid viscosity and crystal glass prism reflections.",
                file: "/work/branding/selvare/selvare 6.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 7,
                title: "Botanical Nuance",
                caption: "Organic textures communicating raw natural ingredients and aromatic character.",
                file: "/work/branding/selvare/selvare 7.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 8,
                title: "Natural Materials",
                caption: "Dark wood-grain cap and sandstone surfaces embodying quiet luxury.",
                file: "/work/branding/selvare/selvare 8.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 9,
                title: "Campaign Editorial",
                caption: "Fashion-led portraiture capturing intimate, timeless personal presence.",
                file: "/work/branding/selvare/selvare 9.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 10,
                title: "Unboxing Architecture",
                caption: "A considered unboxing ritual engineered through tactile materials and precise tolerances.",
                file: "/work/branding/selvare/selvare 10.png",
                span: "col-span-12 md:col-span-7 row-span-2 min-h-[420px]"
            },
            {
                id: 11,
                title: "Visual Identity System",
                caption: "Harmonious dialogue between Cormorant Garamond wordmark and Manrope system.",
                file: "/work/branding/selvare/selvare 11.png",
                span: "col-span-12 md:col-span-5 row-span-2 min-h-[420px]"
            },
            {
                id: 12,
                title: "Material Harmony",
                caption: "Espresso, warm taupe, and champagne gold details forming an intimate world.",
                file: "/work/branding/selvare/selvare 12.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 13,
                title: "Digital Art Direction",
                caption: "Spacious digital layouts translated into an immersive online discovery experience.",
                file: "/work/branding/selvare/selvare 13.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 14,
                title: "Fashion Led Perspective",
                caption: "Sculptural shadow and form communicating memory, scent, and understated luxury.",
                file: "/work/branding/selvare/selvare 14.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 15,
                title: "Spatial Atmosphere",
                caption: "Intimate architectural staging anchoring the flacon in a serene environment.",
                file: "/work/branding/selvare/selvare 15.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 16,
                title: "Modern Essence",
                caption: "Contemporary luxury free from ostentation, driven by poise and material honesty.",
                file: "/work/branding/selvare/selvare 16.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 17,
                title: "Editorial Essence",
                caption: "Quiet elegance framed by architectural minimalism and cinematic light.",
                file: "/work/branding/selvare/selvare 17.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 18,
                title: "Tactile Texture",
                caption: "Paper stock grain and micro-embossed insignia detail.",
                file: "/work/branding/selvare/selvare 18.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 19,
                title: "Atmospheric Shadow",
                caption: "Chiaroscuro balance defining the amber glass contour.",
                file: "/work/branding/selvare/selvare 19.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 20,
                title: "Timeless Presence",
                caption: "The complete SELVARE brand world distilled into a single timeless manifestation.",
                file: "/work/branding/selvare/selvare 20.png",
                span: "col-span-12 row-span-2 min-h-[460px]"
            }
        ],
        outcomeTitlePrefix: "A Unified Creative ",
        outcomeScriptWord: "Direction"
    },

    "Ixora": {
        id: "ixora",
        brandName: "Ixora",
        title: "IXORA",
        subtitlePrefix: "The Essence of",
        scriptSubtitle: "Radiance",
        category: "Haute Parfumerie and Skincare",
        heroImage: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
        accentColor: "#F59E0B",
        projectType: "Luxury Brand Identity",
        typography: "Canela and Neue Haas Grotesk",
        discipline: "Visual Identity, Packaging and Editorial",
        curationCount: "14 Curated Assets",
        chapter1Title: "Sensory Radiance and Botanical ",
        chapter1ScriptWord: "Purity",
        chapter1Paragraph1: "IXORA bridges the rare alchemy of French haute parfumerie with organic botanical skincare. Conceived for discerning connoisseurs, the identity celebrates golden solar warmth, luminous liquid viscosity, and tactile amber glass vessels.",
        chapter1Paragraph2: "To translate sunlight, rare floral essences, and sensory rituals into a high-fashion visual identity. Every packaging touchpoint balances ethereal warmth with brutalist precision and tactile luxury.",
        chapter2Title: "Solar Reverence and Material ",
        chapter2ScriptWord: "Poise",
        pillars: [
            {
                number: "01",
                title: "Luminous",
                description: "Fluted crystal flacons, amber tint refractions, and liquid gold illumination under directional natural sunlight."
            },
            {
                number: "02",
                title: "Botanical",
                description: "Raw natural extracts, velvet silk textures, and micro-droplet editorial clarity capturing botanical potency."
            },
            {
                number: "03",
                title: "Haute Couture",
                description: "Minimalist serif typography, gilded foil accents, and timeless editorial framing for luxury cosmetic ritual."
            }
        ],
        palette: [
            { name: "Amber Gold", hex: "#F59E0B", textDark: false },
            { name: "Solar Cream", hex: "#FFFBEB", textDark: true },
            { name: "Warm Ochre", hex: "#D97706", textDark: false },
            { name: "Velvet Bronze", hex: "#78350F", textDark: false },
            { name: "Noir Obsidian", hex: "#0F0F11", textDark: false }
        ],
        services: [
            "Brand Strategy",
            "Visual Identity",
            "Logo Design",
            "Packaging Concept",
            "Product Art Direction",
            "Campaign Imagery",
            "Website Art Direction"
        ],
        galleryTitlePrefix: "The Ixora",
        galleryScriptWord: "Archive",
        gallery: [
            {
                id: 101,
                title: "Elixir Solaire",
                caption: "Haute parfumerie flacon with radiant solar glass architecture.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
                span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
            },
            {
                id: 102,
                title: "Kinetic Form and Shadow",
                caption: "Fashion editorial balancing draped silk and warm shadow geometry.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_18_31 PM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 103,
                title: "Solar Reverence",
                caption: "Warm natural illumination articulating glass contour and amber liquid.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_24_31 PM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 104,
                title: "Silhouette in Ochre",
                caption: "Intimate editorial portrait framed by warm terracotta earth tones.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_27_12 PM.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 105,
                title: "Ethereal Silk Veil",
                caption: "Botanical skincare campaign capturing organic textures and fluid grace.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 01_17_00 PM.png",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 106,
                title: "Monochrome Gaze",
                caption: "High-contrast portraiture communicating timeless composure and prestige.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_21_27 PM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 107,
                title: "Palais Promenade",
                caption: "Neoclassical exterior staging reflecting old-world European grandeur.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_35_46 PM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 108,
                title: "Terrace of the Muses",
                caption: "Summer fashion editorial showcasing structural tailoring against marble.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_10_38 AM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 109,
                title: "Vinyl and Velvet",
                caption: "Tactile acoustic lifestyle campaign celebrating analogue warmth.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_56_59 PM.png",
                span: "col-span-12 md:col-span-7 row-span-2 min-h-[420px]"
            },
            {
                id: 110,
                title: "Creme De Minuit",
                caption: "Night-recovery cosmetic vessel with obsidian lid and gilded typography.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 03_03_16 PM.png",
                span: "col-span-12 md:col-span-5 row-span-2 min-h-[420px]"
            },
            {
                id: 111,
                title: "Galerie Royale",
                caption: "Architectural grandeur capturing heritage vaulted ceilings and golden light.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_22_22 AM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 112,
                title: "Facet and Crystal",
                caption: "Precision-cut glass facets refracting radiant spectrums of sunlight.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 01_13_27 PM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 113,
                title: "Aura Botanica",
                caption: "Pure clean luxury skincare presented with restrained organic geometry.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_11_59 AM.png",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 114,
                title: "Verve and Precision",
                caption: "The complete visual symphony of Ixora distilled into a single cohesive manifesto.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_26_18 AM.png",
                span: "col-span-12 row-span-2 min-h-[460px]"
            }
        ],
        outcomeTitlePrefix: "A Unified Creative ",
        outcomeScriptWord: "Direction"
    },

    "Nexa": {
        id: "nexa",
        brandName: "Nexa",
        title: "NEXA",
        subtitlePrefix: "Visual Architecture and",
        scriptSubtitle: "Modernism",
        category: "Haute Couture and Architectural Design",
        heroImage: "/work/branding/nexa 2.webp",
        accentColor: "#E11D48",
        projectType: "Contemporary Fashion Identity",
        typography: "Monument Grotesk and Soehne",
        discipline: "Art Direction, Lookbook and Digital",
        curationCount: "14 Curated Assets",
        chapter1Title: "Monolithic Geometry and Structural ",
        chapter1ScriptWord: "Precision",
        chapter1Paragraph1: "NEXA represents the intersection of avant-garde visual architecture and structural minimalism. Engineered for modern design movements, the brand combines sharp geometric silhouettes, stark crimson contrast, and cinematic high-fashion editorial production.",
        chapter1Paragraph2: "To craft a commanding visual language that feels architectural, sharp, and uncompromising. Designed to stand out in high-fashion galleries, runway lookbooks, and modern spatial installations.",
        chapter2Title: "Structural Tension and Kinetic ",
        chapter2ScriptWord: "Motion",
        pillars: [
            {
                number: "01",
                title: "Architectural",
                description: "Bold monolithic proportions, hard-edge shadows, and geometric structure framing high-fashion garments."
            },
            {
                number: "02",
                title: "Kinetic",
                description: "Dynamic lookbook compositions, flowing technical fabrics, and sharp focal depth capturing motion."
            },
            {
                number: "03",
                title: "Brutalist",
                description: "Stark negative space, hyper-legible modernist type, and electric crimson accentuation."
            }
        ],
        palette: [
            { name: "Crimson Red", hex: "#E11D48", textDark: false },
            { name: "Pure Obsidian", hex: "#0A0A0C", textDark: false },
            { name: "Graphite Mist", hex: "#27272A", textDark: false },
            { name: "Titanium White", hex: "#F4F4F5", textDark: true },
            { name: "Deep Carbon", hex: "#18181B", textDark: false }
        ],
        services: [
            "Brand Strategy",
            "Visual Identity",
            "Logo Design",
            "Packaging Concept",
            "Product Art Direction",
            "Campaign Imagery",
            "Website Art Direction"
        ],
        galleryTitlePrefix: "The Nexa",
        galleryScriptWord: "Manifesto",
        gallery: [
            {
                id: 201,
                title: "Monolithic Silhouette",
                caption: "High-contrast architectural tailoring juxtaposed against stark urban brutalism.",
                file: "/work/branding/nexa 2.webp",
                span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
            },
            {
                id: 202,
                title: "Lookbook Vol 01",
                caption: "Monochrome studio capture detailing precise tailoring seams and drape.",
                file: "/work/branding/nexa 1.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 203,
                title: "Structural Geometry",
                caption: "Sharp geometric silhouettes cutting through ambient spatial fog.",
                file: "/work/branding/nexa 4.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 204,
                title: "Chiaroscuro Motion",
                caption: "Fluid motion captured with directional studio flash and deep black shadows.",
                file: "/work/branding/nexa 5.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 205,
                title: "Textile Physics",
                caption: "Tactile micro-texture of waterproof technical fabrics under macro lens.",
                file: "/work/branding/nexa 6.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 206,
                title: "Editorial Framing",
                caption: "Minimalist fashion portrait emphasizing poise, collar structure, and attitude.",
                file: "/work/branding/nexa 7.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 207,
                title: "Monochrome Precision",
                caption: "Zero-ornamentation design ethos executed across stark monochrome lookbooks.",
                file: "/work/branding/nexa 8.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 208,
                title: "Crimson Horizon",
                caption: "Vibrant crimson accent line punctuating monochromatic darkness.",
                file: "/work/branding/nexa 9.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 209,
                title: "Avant-Garde Tailoring",
                caption: "Oversized structural coats balancing masculine structure with fluid elegance.",
                file: "/work/branding/nexa 10.webp",
                span: "col-span-12 md:col-span-7 row-span-2 min-h-[420px]"
            },
            {
                id: 210,
                title: "Spatial Modernism",
                caption: "Architectural lookbook layout combining typography, grid, and imagery.",
                file: "/work/branding/nexa 11.webp",
                span: "col-span-12 md:col-span-5 row-span-2 min-h-[420px]"
            },
            {
                id: 211,
                title: "Architectural Contour",
                caption: "Hard shadows carving dramatic contours across stark white backgrounds.",
                file: "/work/branding/nexa 12.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 212,
                title: "Kinetic Form",
                caption: "Fluid garment movement preserved in high-speed studio capture.",
                file: "/work/branding/nexa 13.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 213,
                title: "Minimalist Form",
                caption: "Pure geometry distilled to its most potent visual manifestation.",
                file: "/work/branding/nexa 14.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
            },
            {
                id: 214,
                title: "Campaign Climax",
                caption: "The full architectural power of Nexa manifested in a monumental final portrait.",
                file: "/work/branding/nexa 15.webp",
                span: "col-span-12 row-span-2 min-h-[460px]"
            }
        ],
        outcomeTitlePrefix: "A Unified Creative ",
        outcomeScriptWord: "Direction"
    },

    "Define": {
        id: "define",
        brandName: "Define",
        title: "DEFINE",
        subtitlePrefix: "Editorial Rigor and",
        scriptSubtitle: "Typography",
        category: "Editorial Identity and Studio",
        heroImage: "/work/branding/define 1.webp",
        accentColor: "#2563EB",
        projectType: "Studio Identity and Art Direction",
        typography: "Editorial New and Plain",
        discipline: "Publications, Packaging and Web",
        curationCount: "7 Curated Assets",
        chapter1Title: "Typographic Discipline and Contemporary ",
        chapter1ScriptWord: "Form",
        chapter1Paragraph1: "DEFINE is an editorial collective and design atelier founded on typographic restraint and tactile publication craft. Built around high-contrast cobalt blue anchors and monochrome magazine layouts, DEFINE explores how deliberate typesetting transforms visual perception.",
        chapter1Paragraph2: "To elevate print and digital publishing into a high-art discipline. Balancing strict Swiss grid systems with spontaneous micro-typography, textured paper finishes, and tactile foil details.",
        chapter2Title: "Monochrome Clarity and Electric ",
        chapter2ScriptWord: "Contrast",
        pillars: [
            {
                number: "01",
                title: "Typographic",
                description: "Rigorous Swiss grids, oversized glyphs, and micro-annotated margin systems creating editorial rhythm."
            },
            {
                number: "02",
                title: "Tactile",
                description: "Heavy cotton paper stock, blind debossing, and foil-stamped publication covers crafted for physical touch."
            },
            {
                number: "03",
                title: "Electric",
                description: "Shocking cobalt blue accents cutting through monochromatic black and white editorial clarity."
            }
        ],
        palette: [
            { name: "Electric Cobalt", hex: "#2563EB", textDark: false },
            { name: "Chalk White", hex: "#FAFAFA", textDark: true },
            { name: "Deep Charcoal", hex: "#18181B", textDark: false },
            { name: "Slate Gray", hex: "#64748B", textDark: false },
            { name: "Pitch Black", hex: "#050505", textDark: false }
        ],
        services: [
            "Brand Strategy",
            "Visual Identity",
            "Logo Design",
            "Packaging Concept",
            "Product Art Direction",
            "Campaign Imagery",
            "Website Art Direction"
        ],
        galleryTitlePrefix: "The Define",
        galleryScriptWord: "Anthology",
        gallery: [
            {
                id: 301,
                title: "Editorial Wordmark",
                caption: "Monolithic typographic lockup anchored by sharp electric cobalt accents.",
                file: "/work/branding/define 1.webp",
                span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
            },
            {
                id: 302,
                title: "Typographic Architecture",
                caption: "Strict Swiss grid layout balancing dense serif paragraphs with generous whitespace.",
                file: "/work/branding/define 2.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 303,
                title: "Swiss Grid Systems",
                caption: "Modular editorial system created for publication spreads and visual art reviews.",
                file: "/work/branding/define 3.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 304,
                title: "Cobalt Contrast",
                caption: "Intense cobalt blue field creating dynamic optical tension against monochrome photography.",
                file: "/work/branding/define 4.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 305,
                title: "Publication Spread",
                caption: "Double-page editorial magazine composition with macro headline typesetting.",
                file: "/work/branding/define 5.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 306,
                title: "Tactile Paper Stocks",
                caption: "Custom debossed letterpress printing on uncoated archival cotton paper.",
                file: "/work/branding/define 6.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 307,
                title: "Digital Manifest",
                caption: "Responsive editorial digital experience translating print precision to the web.",
                file: "/work/branding/define 7.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            }
        ],
        outcomeTitlePrefix: "A Unified Creative ",
        outcomeScriptWord: "Direction"
    },

    "The Verdant Court": {
        id: "verdant-court",
        brandName: "The Verdant Court",
        title: "THE VERDANT COURT",
        subtitlePrefix: "Botanical Splendor and",
        scriptSubtitle: "Heritage",
        category: "Luxury Hospitality and Estates",
        heroImage: "/work/branding/courts 1.webp",
        accentColor: "#10B981",
        projectType: "Heritage Estate Identity",
        typography: "Ogg and Bradford",
        discipline: "Environmental Identity, Signage and Print",
        curationCount: "6 Curated Assets",
        chapter1Title: "Palace Conservatories and Natural ",
        chapter1ScriptWord: "Grandeur",
        chapter1Paragraph1: "THE VERDANT COURT reimagines century-old European botanic gardens and grand palace courtyards for modern luxury hospitality. The identity pairs aristocratic emerald hues, neoclassical stonework, and organic foliage to cultivate a world of quiet grandeur.",
        chapter1Paragraph2: "To create an enduring environmental identity that honors historical botanical heritage while speaking effortlessly to contemporary luxury travelers and guests.",
        chapter2Title: "Classical Symmetry and Verdant ",
        chapter2ScriptWord: "Grace",
        pillars: [
            {
                number: "01",
                title: "Botanical",
                description: "Lush palace conservatory foliage, creeping vines, and organic specimen photography under arched glass ceilings."
            },
            {
                number: "02",
                title: "Neoclassical",
                description: "Hand-carved stone reliefs, arched promenade perspectives, and bronze patina signage embedded in estate grounds."
            },
            {
                number: "03",
                title: "Verdant",
                description: "Rich forest emeralds, aged parchment tones, and whisper-quiet golden accents honoring timeless legacy."
            }
        ],
        palette: [
            { name: "Emerald Green", hex: "#10B981", textDark: false },
            { name: "Deep Forest", hex: "#064E3B", textDark: false },
            { name: "Champagne Gold", hex: "#D4AF37", textDark: true },
            { name: "Aged Marble", hex: "#F5F5F0", textDark: true },
            { name: "Night Shadow", hex: "#0A120E", textDark: false }
        ],
        services: [
            "Brand Strategy",
            "Visual Identity",
            "Logo Design",
            "Packaging Concept",
            "Product Art Direction",
            "Campaign Imagery",
            "Website Art Direction"
        ],
        galleryTitlePrefix: "The Verdant Court",
        galleryScriptWord: "Collection",
        gallery: [
            {
                id: 401,
                title: "Palace Promenade",
                caption: "Sweeping European palace arches framing lush courtyard botanical gardens.",
                file: "/work/branding/courts 1.webp",
                span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
            },
            {
                id: 402,
                title: "Botanical Conservatory",
                caption: "Victorian glasshouse architecture filled with tropical palms and natural light.",
                file: "/work/branding/courts 2.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 403,
                title: "Arched Stonework",
                caption: "Classical limestone columns and hand-carved friezes enduring across centuries.",
                file: "/work/branding/courts 3.webp",
                span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
            },
            {
                id: 404,
                title: "Emerald Signage",
                caption: "Bespoke estate wayfinding executed in deep forest green and polished brass.",
                file: "/work/branding/court 4.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 405,
                title: "Heritage Monogram",
                caption: "Intertwined botanical monogram debossed into heavy linen estate stationery.",
                file: "/work/branding/courts 5.webp",
                span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
            },
            {
                id: 406,
                title: "Courtyard Atmosphere",
                caption: "The serene harmony of stone, water, and flora welcoming discerning visitors.",
                file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_35_46 PM.png",
                span: "col-span-12 row-span-2 min-h-[460px]"
            }
        ],
        outcomeTitlePrefix: "A Unified Creative ",
        outcomeScriptWord: "Direction"
    }
};

BRAND_STUDIES["Sélvaré"] = BRAND_STUDIES["Selvare"];
