// create-post.dto.ts
export class CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number; // Assuming you want to set the author on creation
}
