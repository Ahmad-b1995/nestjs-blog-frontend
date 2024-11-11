import React from 'react';
import { Button, Table, Popconfirm, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IPost, PostEndpoint } from '../../../types/post.type';
import { getAllPosts, deletePost } from '../../../http/post.http';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Posts: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<PostEndpoint>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      notification.success({
        message: 'Post Deleted',
        description: 'The post has been successfully deleted.',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description: `There was an error deleting the post: ${error.message}`,
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns: TableColumnsType<IPost> = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      sorter: (a, b) => a.summary.length - b.summary.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      render: (categories: string) => (categories ? categories.split(',').join(', ') : ''),
      sorter: (a, b) => a.categories.length - b.categories.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (tags: string) => (tags ? tags.split(',').join(', ') : ''),
      sorter: (a, b) => a.tags.length - b.tags.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/blog/posts/add-edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  const onChange: TableProps<IPost>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  if (error) return <div>Error loading posts</div>;

  const transformedData = data?.data.map((post: IPost) => ({
    key: post.id,
    ...post,
  }));

  return (
    <div>
      <Button type="primary" onClick={() => navigate(`/blog/posts/add-edit`)}>Create New Post</Button>
      <Table
        className='mt-4'
        scroll={{ x: 500, y: 600 }}
        columns={columns}
        dataSource={transformedData}
        onChange={onChange}
        loading={isLoading}
        showSorterTooltip={{ title: 'Sort' }}
      />
    </div>
  );
};

export default Posts;
