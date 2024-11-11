import { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    notification,
} from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createCategory } from '../../../http/category.http';
import ImageSelectorDialog from '../../../components/ui/ImageSelectorDialog';
import { IFileListResponse } from '../../../types/media.type';
import { ICategory } from '../../../types/category.type';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 16 },
    },
};

const AddEditCategory = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSelectorVisible, setIsImageSelectorVisible] = useState(false);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            notification.success({
                message: 'Category Created',
                description: 'Your category has been successfully created.',
            });
            navigate(-1); // Go back to the previous page
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: `There was an error creating the category: ${error.message}`,
            });
        },
    });

    const handleSubmit = (values: any) => {
        const formData: ICategory = { ...values, img: selectedImage || '', del: false };
        mutation.mutate(formData);
    };

    const handleImageSelect = (image: IFileListResponse) => {
        setSelectedImage(image.url);
        setIsImageSelectorVisible(false);
    };

    return (
        <Card title="Add/Edit Category">
            <Form
                {...formItemLayout}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Alias" name="alias" rules={[{ required: true, message: 'Please input the alias!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="desc">
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Image" name="img">
                    {selectedImage ? (
                        <div>
                            <img src={`${import.meta.env.VITE_BASE_URL}${selectedImage}`} alt="Selected" className="w-20 mt-2" />
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => setSelectedImage(null)}
                                danger
                                size="small"
                                className="bg-white absolute bottom-1 left-1"
                            />
                        </div>
                    ) : (
                        <Button icon={<UploadOutlined />} onClick={() => setIsImageSelectorVisible(true)}>
                            Select Image
                        </Button>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <ImageSelectorDialog
                open={isImageSelectorVisible}
                onSelect={handleImageSelect}
                onCancel={() => setIsImageSelectorVisible(false)}
            />
        </Card>
    );
};

export default AddEditCategory;
