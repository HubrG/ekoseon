import { BlogPost } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BlogPostListViewItem from "./BlogPostListViewItem";

interface BlogPostListProps {
  blogPosts: BlogPost[];
}
interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
  } | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {

  return (
    <Table className="">
      <TableCaption>Liste des articles</TableCaption>
      <TableHeader>
        <TableRow className="bg-app-50 text-app-500">
          <TableHead></TableHead>
          <TableHead className="w-[100px] text-app-500"></TableHead>
          <TableHead className="text-left text-app-500">Titre</TableHead>
          <TableHead className="text-center text-app-500">Statut</TableHead>
          <TableHead className="text-center text-app-500">Catégorie</TableHead>
          <TableHead className="text-center text-app-500">Créé le</TableHead>
          <TableHead className="text-center text-app-500">Publié le</TableHead>
          <TableHead className="text-center text-app-500">Modifié le</TableHead>
          <TableHead className="text-center text-app-500"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogPosts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((post: CustomBlogPost) => (
              <BlogPostListViewItem key={post.id} post={post} />
          ))}
      </TableBody>
    </Table>
  );
};

export default BlogPostListView;
