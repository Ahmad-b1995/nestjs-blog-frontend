import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { PiTextAlignJustify } from "react-icons/pi";
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, FileImageOutlined, HighlightOutlined, ItalicOutlined, UnderlineOutlined } from '@ant-design/icons';


interface Props {
    initialContent: string,
    onChange: (content: string) => void
}

const TiPTapEditor = ({ initialContent, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Image,
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className='border rounded-md min-h-96'>
            <div className="editor-toolbar border-b p-2 flex items-center justify-start gap-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="editor-button">
                    <BoldOutlined />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="editor-button">
                    <ItalicOutlined />
                </button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="editor-button">
                    <UnderlineOutlined />
                </button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="editor-button">
                    <HighlightOutlined />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="editor-button">
                    <AlignLeftOutlined />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="editor-button">
                    <AlignCenterOutlined />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="editor-button">
                    <AlignRightOutlined />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className="editor-button">
                    <PiTextAlignJustify />
                </button>
                <button onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }} className="editor-button">
                   <FileImageOutlined />
                </button>
            </div>
            <EditorContent editor={editor} className='[&>*]:min-h-96 [&>*]:p-2 [&>*]:outline-none'/>
        </div>
    );
};

export default TiPTapEditor;
