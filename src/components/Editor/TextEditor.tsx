import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import hashtagStyles from './hashtagStyles.module.css';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import { BoldButton } from 'draft-js-buttons';
import linkStyles from './linkStyles.module.css';
import BlockStyling from './BlockStyling.module.css';
import ImageAdd from './ImageAdd';
import createStyles from 'draft-js-custom-styles';
import buttonStyle from './button.module.scss';
import classNames from 'classnames';
import useEditor from './hooks/useEditor';
import { useRouter } from 'next/router';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import Tags from '../Tags';
import { useDispatch, useSelector } from 'react-redux';
import { PostInit } from 'src/store/post';
import { checkEmpty } from 'src/utils/isNull';
import { toast, ToastContainer } from 'react-nextjs-toast';
import media from 'src/lib/styles/media';
import TagsForm from '../Forms/TagsForm';

const Title = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  min-height: 2rem;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
  ${media.custom(1200)} {
    width: 80%;
  }
`;

const EditorMainTap = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  .my-little-app {
    padding: 1.1rem;
    width: 70vw;
    margin: 0 auto;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .home-button {
    position: absolute;
  }
  .square_btn {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 5px 11px 5px 15px;
    text-decoration: none;
    color: #67c5ff;
    transition: 0.4s;
    &::after {
      position: absolute;
      display: inline-block;
      content: '';
      width: 4px;
      height: 100%;
      top: 0;
      left: 100%;
      border-radius: 3px;
      background: #67c5ff;
    }
    &:hover:before,
    &:hover:after {
      -webkit-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      transform: rotate(10deg);
    }
    &::before {
      position: absolute;
      display: inline-block;
      content: '';
      width: 4px;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 3px;
      background: #67c5ff;
    }
  }
  .draft-editor-title {
    font-size: 14.5px;
    line-height: 20px;
    letter-spacing: 0.7px;
    font-family: Open Sans;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    position: inline;
    padding: 0.5rem;
    margin-left: 0.6rem;
  }
  .draft-editor-body {
    line-height: 1.6;
    min-height: 9rem;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    font-size: 17px;
    font-weight: 300;
    box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
    height: 120vh;
    width: 40vw;
    padding: 2rem;
    margin: 0 auto;
    ${media.custom(1200)} {
      width: 60vw;
    }
    ${media.custom(600)} {
      all: unset;
      line-height: 1.6;
      word-break: break-word;
    }
    .hashtag {
      color: #1ca782;
      font-family: cursive;
    }
  }
  .post-button {
    cursor: pointer;
    border-radius: 10px;
    font-size: 13px;
    float: right;
    display: inline;
    padding: 0.5em;
    color: #fff;
    border: none;
    background-color: #ff5370;
    margin: 0.4em;
  }
  .editor-style-button {
    display: felx;
    display: inline-block;
    text-decoration: none;
    background: #668ad8; /*ButtonColor*/
    color: #fff;
    border-bottom: solid 4px #627295;
    border-radius: 3px;
    justify-content: center;
    margin-left: 0.2rem;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .editor-style-wrapeer {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: center;
  }
  .inline-style-options {
    margin: auto 0;
    width: 60%;
    display: flex;
    flex-wrap: wrap;
  }
  .thumbnail-wrapper {
    margin-top: 1.5rem;
  }
  .ImgAdd-button {
    width: 60%;
    margin: 0 auto;
    padding: 1rem;
    margin: 0 auto;
  }
`;

const TagBlock = styled.div`
  display: flex;
  width: 60%;
  margin: 0 auto;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 0.5rem;
  align-items: center;
`;

const Thumbnail = styled.div`
  border: 1px solid red;
  width: 60%;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const inlineStyleButtons = [
  {
    value: 'Bold',
    style: 'BOLD',
  },

  {
    value: 'Italic',
    style: 'ITALIC',
  },

  {
    value: 'Underline',
    style: 'UNDERLINE',
  },

  {
    value: 'Strikethrough',
    style: 'STRIKETHROUGH',
  },

  {
    value: 'Code',
    style: 'CODE',
  },
  {
    value: 'Anycustomstyle',
    style: 'ANYCUSTOMSTYLE',
  },
  {
    value: 'FANCYBLOCKQUOTE',
    style: 'FANCYBLOCKQUOTE',
  },
  {
    value: 'H1',
    style: 'H1',
  },
  {
    value: 'H2',
    style: 'H2',
  },
  {
    value: 'H3',
    style: 'H3',
  },
];

const { customStyleFn } = createStyles(['font-size']);
const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: 'http://…',
});
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  imagePlugin,
  hashtagPlugin,
  inlineToolbarPlugin,
  linkPlugin,
  focusPlugin,
  resizeablePlugin,
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
];

export type EditorMainProps = {};

function EditorMain(props: EditorMainProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(PostInit());
    };
  }, []);
  const inputEl = useRef(null);
  const router = useRouter();
  const {
    handleSubmit,
    EditSubmit,
    inputs,
    editorState,
    setEditorState,
    titleOnChange,
    handleFileInputChange,
    previewSource,
    fileInputState,
    tag,
    setTag,
  } = useEditor();
  const buttonClass = classNames(`${buttonStyle.button} ${buttonStyle.shinydarken}`);

  const myBlockStyleFn = contentBlock => {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return `${BlockStyling.superFancyBlockquote}`;
    } else if (type === 'header-one') {
      return 'h1BlcokTag';
    } else if (type === 'header-two') {
      return 'h2BlcokTag';
    } else if (type === 'header-three') {
      return 'h3BlcokTag';
    }
  };

  const html = convertToHTML({
    styleToHTML: style => {
      if (style === 'BOLD') {
        return <span style={{ fontWeight: 'bold' }} />;
      } else if (style === 'ITALIC') {
        return <span style={{ fontStyle: 'italic' }} />;
      } else if (style === 'UNDERLINE') {
        return <span style={{ textDecoration: ' underline' }} />;
      } else if (style === 'STRIKETHROUGH') {
        return <span style={{ textDecoration: ' line-through' }} />;
      } else if (style === 'CODE') {
        return <span style={{ fontFamily: 'Times New Roman' }} />;
      }
    },

    blockToHTML: block => {
      if (block.type === 'header-one') {
        return <h1 />;
      }
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>;
      }
      return originalText;
    },
  })(editorState.getCurrentContent());

  const onChange = editorState => {
    setEditorState(editorState);
  };

  const toggleInlineStyle = event => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute('data-style');

    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const renderInlineStyleButton = (value, style) => {
    return (
      <input
        type="button"
        key={style}
        value={value}
        data-style={style}
        onMouseDown={toggleInlineStyle}
        className={buttonClass}
      />
    );
  };

  const toggleBlockType = event => {
    event.preventDefault();

    let block = event.currentTarget.getAttribute('data-block');

    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  const addTag = text => {
    const newTag = [...tag, { text }];
    setTag(newTag);
  };

  const deleteTag = index => {
    const newTag = [...tag];
    newTag.splice(index, 1);
    setTag(newTag);
  };

  const onClickNotifyCheckString = e => {
    e.preventDefault();
    toast.notify(`제목을 입력해주세요`, {
      duration: 2,
      type: 'error',
    });
  };

  return (
    <>
      <EditorMainTap>
        <ToastContainer align={'left'} />
        <form>
          <div className="my-little-app">
            {/* <div className="home-button">
              <BackButton />
            </div> */}
            <Title>
              <input
                name="title"
                onChange={titleOnChange}
                value={inputs}
                className="draft-editor-title"
                placeholder="Title"
              />
              <button
                className="post-button"
                onClick={e =>
                  checkEmpty(inputs)
                    ? onClickNotifyCheckString(e)
                    : router.query.slug === undefined
                    ? handleSubmit(e)
                    : EditSubmit(e)
                }>
                완료
              </button>
            </Title>
            <div style={{ marginTop: '1.5rem' }}>
              <TagBlock></TagBlock>
            </div>
            <div className="thumbnail-wrapper">
              <Thumbnail>
                <div>Thumbnail</div>
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                  style={{ margin: '.5rem 0' }}
                />

                {previewSource && (
                  <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
                )}
              </Thumbnail>
            </div>
            <div className="editor-style-wrapeer">
              <div className="inline-style-options">
                {inlineStyleButtons.map(button => {
                  return renderInlineStyleButton(button.value, button.style);
                })}
              </div>
            </div>
            <div className="ImgAdd-button">
              <ImageAdd
                // @ts-ignore
                editorState={editorState}
                onChange={onChange}
                modifier={imagePlugin.addImage}
              />
            </div>
            <div
              className="draft-editor-body"
              onMouseOver={() => inputEl.current.focus()}>
              <Editor
                // @ts-ignore
                customStyleMap={styleMap}
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                handleKeyCommand={handleKeyCommand}
                ref={inputEl}
                plugins={plugins}
                customStyleFn={customStyleFn}
              />
              <InlineToolbar>
                {externalProps => (
                  <>
                    {/* 
  // @ts-ignore */}
                    <BoldButton {...externalProps} />
                    {/* 
  // @ts-ignore */}
                    <linkPlugin.LinkButton {...externalProps} />
                  </>
                )}
              </InlineToolbar>
            </div>
          </div>
        </form>
      </EditorMainTap>
    </>
  );
}

export default EditorMain;

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 4,
  },
  BOLD: {
    color: '#395296',
    fontWeight: 'bold',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
  },
  FANCYBLOCKQUOTE: {
    color: '#999',
    fontStyle: 'italic',
    fontFamily: `'Hoefler Text', Georgia, serif`,
    display: 'flex',
    justifyContent: 'center',
  },
  H1: {
    fontSize: '2rem',
  },
  H2: {
    fontSize: '1.5rem',
  },
  H3: {
    fontSize: '1.7rem',
  },
};
