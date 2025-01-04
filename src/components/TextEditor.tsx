import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import strikeIcon from "../assets/icons/strike.svg"
import descriptionIcon from "../assets/icons/descriptionIcon.svg"
import orderedListIcon from "../assets/icons/order_list_icon.svg"
import unorderedListIcon from "../assets/icons/unorder_list_icon.svg"

interface TextEditorProps {
  maxCharacters: number;
}

const TextEditor: React.FC<TextEditorProps> = ({ maxCharacters }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [charCount, setCharCount] = useState(0);

  const handleEditorChange = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    const plainText = currentContent.getPlainText();

    if (plainText.length <= maxCharacters) {
      setEditorState(state);
      setCharCount(plainText.length);
    }
  };

  const applyStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const currentContent = editorState.getCurrentContent();
  const isMaxReached = currentContent.getPlainText().length >= maxCharacters;

  return (
    <div className='border-2 border-black rounded-lg my-4 min-h-[25%] flex flex-col justify-between p-2 px-3 bg-[#FAFAFA] border-opacity-10'>
      <div className='w-full h-auto'>
        <Editor placeholder={<div className='flex'><img src={descriptionIcon} /> Description</div>} editorState={editorState} onChange={handleEditorChange} />
      </div>
      <div className='flex justify-between items-center'>
        <div className='w-1/4 flex justify-between items-center'>
          <div className='cursor-pointer font-mulish font-bold' onClick={() => applyStyle('BOLD')} >
            B
          </div>
          <div className='cursor-pointer' onClick={() => applyStyle('ITALIC')} >
            /
          </div>
          <div className='cursor-pointer' onClick={() => applyStyle('STRIKETHROUGH')} >
            <img src={strikeIcon} />
          </div>
          <div className='text-[#CECECE] text-2xl pb-2'>|</div>
          <div className='cursor-pointer' onClick={() => applyBlockType('ordered-list-item')} >
            <img src={orderedListIcon} />
          </div>
          <div className='cursor-pointer' onClick={() => applyBlockType('unordered-list-item')} >
            <img src={unorderedListIcon} />
          </div>
        </div>
        <small className='w-1/4 text-end text-[#A2A3A7]'>
          {charCount}/{maxCharacters} characters
        </small>
      </div>
    </div>
  );
};

export default TextEditor;
