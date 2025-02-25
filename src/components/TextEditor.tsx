import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import strikeIcon from '../assets/icons/strike.svg';
import descriptionIcon from '../assets/icons/descriptionIcon.svg';
import orderedListIcon from '../assets/icons/order_list_icon.svg';
import unorderedListIcon from '../assets/icons/unorder_list_icon.svg';

interface TextEditorProps {
  maxCharacters: number;
  onchange: (text: string) => void;
  value: string | undefined;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, maxCharacters, onchange }) => {
  const [isValueLoaded, setIsValueLoaded] = useState<boolean>(false)
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(false)
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
      onchange(JSON.stringify(convertToRaw(currentContent)));
    }
  };

  const applyStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  useEffect(() => {
    if (value && !isValueLoaded) {
      setIsValueLoaded(true);
      try {
        const rawContent = JSON.parse(value);
        const contentState = convertFromRaw(rawContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error('Invalid raw content:', error);
      }
    }
  }, [value, isValueLoaded]);
  

  useEffect(()=>{
    setIsComponentMounted(true)
  },[])

  return (
    <div className="border-2 border-black rounded-lg my-4 min-h-28 md:min-h-[25%] flex flex-col justify-between px-3 pt-1 md:p-2 md:px-3 bg-[#FAFAFA] border-opacity-10">
      <div className="w-full h-full">
        {isComponentMounted && <Editor
          placeholder={<div className='flex'><img src={descriptionIcon} /> Description</div>}
          editorState={editorState}
          onChange={handleEditorChange}
        />}
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/4 flex justify-between items-center">
          <div className="cursor-pointer font-mulish font-bold" onClick={() => applyStyle('BOLD')}>
            B
          </div>
          <div className="cursor-pointer" onClick={() => applyStyle('ITALIC')}>
            /
          </div>
          <div className="cursor-pointer" onClick={() => applyStyle('STRIKETHROUGH')}>
            <img src={strikeIcon} alt="Strike" />
          </div>
          <div className="text-[#CECECE] text-2xl pb-2">|</div>
          <div className="cursor-pointer" onClick={() => applyBlockType('ordered-list-item')}>
            <img src={orderedListIcon} alt="Ordered List" />
          </div>
          <div className="cursor-pointer" onClick={() => applyBlockType('unordered-list-item')}>
            <img src={unorderedListIcon} alt="Unordered List" />
          </div>
        </div>
        <small className="w-max text-end text-[#A2A3A7]">
          {charCount}/{maxCharacters} characters
        </small>
      </div>
    </div>
  );
};

export default TextEditor;
