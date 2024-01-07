export interface ProductDetail {
  id: number;
  title: string;
  image: string;
  description: string;
  rate: number;
  created_at: string;
  comments: CommentType[];
}
export interface CommentType {
  name: string;
  id: number;
  content: string;
  product_id: number;
  created_at: string;
  user: User[];
}
export interface User {
  id: number;
  email: string;
}
export interface Order {
  id: number;
  status: string;
  image: string;
  title: string;
  created_at: string;
}
export interface ProductData {
  id: number;
  rate: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
}