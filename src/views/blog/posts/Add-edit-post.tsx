import { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Card,
    notification,
} from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPost } from '../../../http/post.http';
import { getAllTags } from '../../../http/tag.http';
import { getAllCategories } from '../../../http/category.http';
import ImageSelectorDialog from '../../../components/ui/ImageSelectorDialog';
import { IFileListResponse } from '../../../types/media.type';
import TiPTapEditor from '../../../components/ui/TipTapEditor';

const { Option } = Select;

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

const AddEditPost = () => {
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSelectorVisible, setIsImageSelectorVisible] = useState(false);
    const navigate = useNavigate();

    const { data: tags, isError: isTagsError, error: tagsError } = useQuery({
        queryKey: ['tags'],
        queryFn: getAllTags,
    });

    const { data: categories, isError: isCategoriesError, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
    });

    if (isTagsError) {
        notification.error({
            message: 'Error',
            description: `There was an error fetching the tags: ${tagsError.message}`,
        });
    }

    if (isCategoriesError) {
        notification.error({
            message: 'Error',
            description: `There was an error fetching the categories: ${categoriesError.message}`,
        });
    }

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            notification.success({
                message: 'Post Created',
                description: 'Your post has been successfully created.',
            });
            navigate(-1); // Go back to the previous page
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: `There was an error creating the post: ${error.response.data.message}`,
            });
        },
    });

    const handleSubmit = (values: any) => {
        const formData = { ...values, content, img: selectedImage };
        mutation.mutate(formData);
    };

    const handleImageSelect = (image: IFileListResponse) => {
        setSelectedImage(image.url);
        setIsImageSelectorVisible(false);
    };

    return (
        <Card title="Add/Edit Post" className='max-h-[90vh] overflow-y-scroll'>
            <Form
                {...formItemLayout}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input the content!' }]}>
                    <TiPTapEditor initialContent={content} onChange={setContent} />
                </Form.Item>

                <Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please input the author!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Categories" name="categories" rules={[{ required: true, message: 'Please select categories!' }]}>
                    <Select mode="multiple">
                        {categories?.map(category => (
                            <Option key={category.id} value={category.name}>{category.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Tags" name="tags" rules={[{ required: true, message: 'Please input tags!' }]}>
                    <Select mode="tags">
                        {tags?.map(tag => (
                            <Option key={tag.id} value={tag.name}>{tag.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Summary" name="summary" rules={[{ required: true, message: 'Please input the summary!' }]}>
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Please input the slug!' }]}>
                    <Input />
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

export default AddEditPost;
