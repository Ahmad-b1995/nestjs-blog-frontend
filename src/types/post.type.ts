export interface PostEndpoint {
  data: IPost[];
  count: number;
  pageSize: number;
  pageNo: number;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  tags: string[];
  summary: string;
  slug: string;
  img: string;
}
