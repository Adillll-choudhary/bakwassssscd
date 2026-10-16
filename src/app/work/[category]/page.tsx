import CategoryWorkClient from "@/components/sections/CategoryWorkClient";

export async function generateStaticParams() {
    const categories = [
        "shoots",
        "branding",
        "edits",
        "ai-content",
        "websites",
        "instagram-posts",
        "strategic-growth",
        "logos",
        "thumbnails",
        "ads",
        "archive"
    ];
    return categories.map((category) => ({
        category: category,
    }));
}

export default function CategoryPage() {
    return <CategoryWorkClient />;
}
