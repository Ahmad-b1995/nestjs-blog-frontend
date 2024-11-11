import { useDropzone } from 'react-dropzone';
import { useQuery, useMutation } from '@tanstack/react-query';
import { deleteFile, getFileList, uploadFile } from '../../http/media.http';
import { Card, Progress, Button, List, Image, Modal, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Media = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(0);

  const { data: files, isLoading, refetch } = useQuery({ queryKey: ['files'], queryFn: getFileList });

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => uploadFile(formData),
    onSuccess: () => {
      setUploadedFiles(prev => prev + 1);
      refetch();
    },
    onSettled: () => {
      setUploadProgress((prev) => prev + (100 / totalFiles));
      if (uploadedFiles + 1 === totalFiles) {
        setUploadProgress(0);
        setTotalFiles(0);
        setUploadedFiles(0);
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFile(id),
    onSuccess: () => {
      refetch();
    }
  });

  const onDrop = (acceptedFiles: File[]) => {
    setTotalFiles(acceptedFiles.length);
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      uploadMutation.mutate(formData);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = (fileId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this image?',
      onOk: () => {
        deleteMutation.mutate(fileId);
      }
    });
  };

  return (
    <Card>
      <div
        {...getRootProps()}
        className='dashed p-3 w-full flex items-center justify-center cursor-pointer min-h-52 mb-10'
        style={{ border: '1px dashed #d9d9d9', padding: '16px', cursor: 'pointer' }}
      >
        <input {...getInputProps()} multiple />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {isLoading ? (
        <div className=' flex items-center justify-center'>
          <Spin tip="Loading..." />
        </div>
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 5
          }}
          dataSource={files}
          renderItem={file => (
            <List.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src={`${import.meta.env.VITE_BASE_URL}${file.url}`}
                className='max-h-28 max-w-28 object-contain'
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(+file.id)}
                danger
                style={{ position: 'absolute', bottom: 0, left: 0 }}
              />
            </List.Item>
          )}
        />
      )}
      <div className='mt-4'>
        {(uploadMutation.isPending || deleteMutation.isPending) && (
          <Progress percent={uploadProgress} status="active" />
        )}
      </div>
    </Card>
  );
};

export default Media;
