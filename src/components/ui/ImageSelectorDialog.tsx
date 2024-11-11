import React from 'react';
import { Modal, List } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getFileList } from '../../http/media.http';
import { IFileListResponse } from '../../types/media.type';

interface Props {
    open: boolean,
    onSelect: (item: IFileListResponse) => void,
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ImageSelectorDialog = ({ open, onSelect, onCancel }: Props) => {
    const { data: images, isLoading, isError } = useQuery({ queryKey: ['fileList'], queryFn: getFileList });

    return (
        <Modal
            open={open}
            title="Select an Image"
            onCancel={onCancel}
            footer={null}
        >
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading images</div>}
            {images && (
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={images}
                    renderItem={item => (
                        <List.Item>
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}${item.url}`}
                                alt={item.filename}
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => onSelect(item)}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    );
};

export default ImageSelectorDialog;
