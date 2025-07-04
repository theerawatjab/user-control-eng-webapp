declare type SystemList = {
  data: {
    id: number;
    webKey: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  page: number;
  totalPage: number;
  limit: number;
  totalCount: number;
};
