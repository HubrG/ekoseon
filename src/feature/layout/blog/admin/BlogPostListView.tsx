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
    <Table>
      <TableCaption>Liste des articles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="text-center">Titre</TableHead>
          <TableHead className="text-center">Statut</TableHead>
          <TableHead className="text-center">Catégorie</TableHead>
          <TableHead className="text-center">Créé le</TableHead>
          <TableHead className="text-center">Publié le</TableHead>
          <TableHead className="text-center">Modifié le</TableHead>
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
