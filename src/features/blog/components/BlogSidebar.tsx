import BlogSearch from "@/features/blog/components/sidebar/Search";
import BlogCategories from "@/features/blog/components/sidebar/Categories";
import CreateBlog from "./sidebar/CreateBlog";

type BlogCategory = {
  id: string | number;
  title: string;
  count: number;
};

export default function BlogSidebar({
  categories,
}: {
  categories: BlogCategory[];
}) {
  return (
    <aside className="w-full space-y-6 lg:sticky lg:top-8">
      <BlogSearch />
      <BlogCategories categories={categories} />
      <CreateBlog categories={categories} />
    </aside>
  );
}
