import { Button, Table, Popconfirm, notification } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ITag } from '../../../types/tag.type';
import { getAllTags, deleteTag } from '../../../http/tag.http';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Tags = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<ITag[]>({
    queryKey: ['tags'],
    queryFn: getAllTags,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description: `There was an error deleting the tag: ${error.message}`,
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns: TableColumnsType<ITag> = [
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
            onClick={() => navigate(`/blog/tags/add-edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this tag?"
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

  if (error) return <div>Error loading tags</div>;

  return (
    <div>
      <Button type="primary" onClick={() => navigate(`/blog/tags/add-edit`)}>Create New Tag</Button>
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

export default Tags;
