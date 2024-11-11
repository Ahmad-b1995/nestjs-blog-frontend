import { Button, Table, Popconfirm, notification } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../../types/category.type';
import { getAllCategories, deleteCategory } from '../../../http/category.http';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Categories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description: `There was an error deleting the category: ${error.message}`,
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns: TableColumnsType<ICategory> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Alias',
      dataIndex: 'alias',
      sorter: (a, b) => a.alias.length - b.alias.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Image',
      dataIndex: 'img',
      render: (_, record) => (
        <>
          {record.img ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${record.img}`}
              alt={record.name}
              style={{ width: '50px' }}
            />
          ) : (
            <>no image</>
          )}
        </>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/blog/categories/add-edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
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

  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      <Button type="primary" onClick={() => navigate(`/blog/categories/add-edit`)}>Create New Category</Button>
      <Table
        className='mt-4'
        scroll={{ x: 500, y: 600 }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        showSorterTooltip={{ title: 'Sort' }}
      />
    </div>
  );
};

export default Categories;
