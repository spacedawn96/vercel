import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { EditorState, convertFromRaw } from 'draft-js';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { capitalize } from 'src/utils/capitalize';
import { escape } from 'src/utils/checkString';
import moment from 'moment';
import Editor from 'draft-js-plugins-editor';
import useFollowUser from 'src/hooks/useFollowUser';
import { BsFillHeartFill } from 'react-icons/bs';
import usePostLike from 'src/hooks/usePostLike';
import Link from 'next/link';
import useGetPosts from 'src/hooks/useGetPosts';
import { initializeApollo } from 'src/lib/apollo';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeart } from 'react-icons/ti';
import media from 'src/lib/styles/media';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import useGetUser from '../../components/NavBar/hooks/useGetUser';
import useGetComments from 'src/hooks/useGetComments';
import useCreateComment from 'src/hooks/useCreateComment';
import useUnfollowUser from 'src/hooks/useUnfollowUser';
import usePostUnLike from 'src/hooks/usePostUnLike';
import useDeletePost from 'src/hooks/useDeletePost';
import useEditComment from 'src/hooks/useEditComment';
import useDeleteComment from 'src/hooks/useDeleteComment';
import { PostGet } from 'src/store/post';
import PostLike from 'src/components/PostLike';
import FollowButton from 'src/components/FollowButton';
import Navbar from 'src/components/NavBar/NavBar';
import Header, { item } from 'src/components/NavBar';
import CommentForm from 'src/components/Forms/CommentForm';
import Comments from 'src/components/Comments/Comments';
import SubCommentsForm from 'src/components/Forms/SubCommentsForm';
import SubComments from 'src/components/Comments/SubComments';
import createLinkDecorator from '../../components/Editor/Decorators';

const PostPageTap = styled.div`
  .post-wrapper {
    width: 40%;
    margin: 0 auto;
    padding: 6rem;
    ${media.custom(1000)} {
      padding: 0rem;
    }
    ${media.custom(768)} {
      width: 60%;
    }
    ${media.custom(600)} {
      width: 80%;
    }
    ${media.custom(400)} {
      width: 90%;
    }
  }
  .card-wrapper {
    width: 50%;
    right: 0;
    margin: 0 auto;
    position: absolute;
  }
  .like-button-wrapper {
    position: absolute;
    left: 20%;
    margin-top: 8%;
  }
  .sticky-wrapper {
    position: sticky;
    top: 0;
  }
  .comments-count {
    margin: 1rem;
  }
  .dataFormat {
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    font-size: 1rem;
    line-height: 1.5;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif;
    color: rgba(38, 38, 38, 0.66);
  }
  .intro-wrapper {
    margin: 1rem 0;
    line-height: 1.6;
  }
  .comments-wrapper {
    width: 40%;
    margin: 0 auto;
    padding: 6rem;
    ${media.custom(1000)} {
      padding: 3rem;
    }
    ${media.custom(768)} {
      padding: 0rem;
      width: 60%;
      margin-top: 3rem;
    }
    ${media.custom(600)} {
      width: 80%;
    }
    ${media.custom(400)} {
      width: 90%;
    }
  }
  .comments-text-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .comments-edit {
    display: flex;
    cursor: pointer;
    & div {
      margin-right: 1rem;
    }
  }
  .comments-layout {
    text-align: left;
    color: rgb(52, 58, 64);
    margin: auto;
    padding: 1rem;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(233, 236, 239);
    border-image: initial;
    border-radius: 4px;
  }
  .comments-text {
    padding-top: 1rem;
  }
  .comment-write-button {
    display: flex;
    justify-content: space-between;
    color: rgb(134, 142, 150);
    margin-top: 1rem;
  }
  .commentsInput {
    margin-bottom: 1.5rem;
    width: 95%;
    font-size: 1rem;
    color: rgb(33, 37, 41);
    line-height: 1.75;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(233, 236, 239);
    border-image: initial;
    border-radius: 4px;
  }
  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 1rem;
  }
  .subcomments-wrapper {
    margin: 0.5rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
  .comments-edit-wrapper {
    display: flex;
    justify-content: flex-end;
    & div {
      margin-right: 0.4rem;
    }
  }
  .edit-button {
    cursor: pointer;
    display: flex;
    & div {
      margin-right: 0.4rem;
    }
  }
  .tag {
    margin-bottom: 0.875rem;
    background: rgb(241, 243, 245);
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    border-radius: 1rem;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.875rem;
    color: rgb(12, 166, 120);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
  }
  .comments-mini {
    display: flex;
    align-items: center;
  }
  .follow-visible {
    display: none;
    ${media.custom(1900)} {
      display: unset;
    }
  }
`;
const Title = styled.div`
  word-wrap: break-word;
  font-size: 48px;
  margin-bottom: 25px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  letter-spacing: -0.022em;
  line-height: 1.35;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  ${media.custom(1000)} {
    font-size: 36px;
  }
`;

const LikeVisible = styled.div`
  display: none;
  ${media.custom(1900)} {
    display: unset;
  }
`;

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

export type PostPageProps = {};

function PostPage(props: PostPageProps) {
  const dispatch = useDispatch();
  const [isInput, setisInput] = useState(false);
  const post = useSelector((state: RootState) => state.post);
  const { getUser: userData, loading: userLoding } = useGetUser();
  const { loading, error: getError, data } = useGetPosts();
  const { commentsLoading, commentsError, commentstData } = useGetComments();
  const {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  } = useCreateComment();
  const { followHandleSubmit, error, BooleanIsFollowing } = useFollowUser();
  const { unFollowHandleSubmit, unfollowError } = useUnfollowUser();
  const [on, toggle] = useState(false);
  const { LikehandleSubmit, isLikeBoolean } = usePostLike();
  const { UnlikehandleSubmit, isUnLikeBoolean } = usePostUnLike();
  const { DeletePostSubmit } = useDeletePost();
  const { EditCommentSubmit } = useEditComment();
  const { DeleteCommentSubmit } = useDeleteComment();
  const [editComment, setEditComment] = useState(false);

  const [editText, setEditText] = useState('');
  const [subEditText, subSetEditText] = useState('');

  const router = useRouter();

  if (getError) return <p>zzzzzzzzzzz</p>;
  if (loading) return <p>loading</p>;

  if (commentsLoading) return <p>Loading...</p>;
  if (commentsError) return <p>Error !!!!!!!!!!:(</p>;

  const findData = data.posts.find(ele => ele.id == router.query.slug);

  const decorator = createLinkDecorator();

  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(findData.body)),
    decorator,
  );

  const getComments = commentstData.comment.filter(el => el.post_id == router.query.slug);

  const username = findData.user.username;
  const findId = findData.id;

  const getPostData = () => {
    dispatch(PostGet(findData));
  };

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
  };

  const onClickNotify = e => {
    e.preventDefault();
    toast.notify(`로그인이 필요합니다`, {
      duration: 2,
      type: 'error',
    });
  };
  const onClickNotifyCheckString = e => {
    e.preventDefault();
    toast.notify(`댓글이 없습니다`, {
      duration: 2,
      type: 'error',
    });
  };

  return (
    <>
      <ToastContainer align={'left'} />
      <Header />
      <PostPageTap>
        <div className="sticky-wrapper">
          <div className="like-button-wrapper">
            <PostLike
              LikehandleSubmit={LikehandleSubmit}
              isLikeBoolean={isLikeBoolean}
              UnlikehandleSubmit={UnlikehandleSubmit}
            />
          </div>
        </div>
        <div className="sticky-wrapper">
          <div className="card-wrapper">
            <FollowButton
              username={username}
              followHandleSubmit={followHandleSubmit}
              error={error}
              unFollowHandleSubmit={unFollowHandleSubmit}
              unfollowError={unfollowError}
              BooleanIsFollowing={BooleanIsFollowing}
            />
          </div>
        </div>
        <div className="post-wrapper">
          <Title> {capitalize(findData.title)}</Title>

          {findData.tags?.name ? (
            <div className="tag"> {escape(findData.tags.name)} </div>
          ) : (
            ''
          )}
          <div className="dataFormat">
            {moment(findData.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="intro-wrapper">
            {/* 
// @ts-ignore */}
            <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
          </div>
        </div>
        <div className="comments-wrapper">
          <div className="comments-text-wrapper">
            <div className="comments-mini">
              <div className="comments-count">{getComments.length} 개의 댓글</div>
              {userData.me ? (
                <>
                  <LikeVisible>
                    {isLikeBoolean ? (
                      <TiHeart onClick={UnlikehandleSubmit} />
                    ) : (
                      <TiHeartOutline onClick={LikehandleSubmit} />
                    )}
                  </LikeVisible>
                  <div className="follow-visible">
                    {BooleanIsFollowing ? (
                      <AiOutlineUserDelete onClick={unFollowHandleSubmit} />
                    ) : (
                      <AiOutlineUserAdd onClick={followHandleSubmit} />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <LikeVisible>
                    <TiHeartOutline onClick={e => onClickNotify(e)} />
                    <div className="follow-visible">
                      <AiOutlineUserAdd onClick={e => onClickNotify(e)} />
                    </div>
                  </LikeVisible>
                </>
              )}
            </div>
            {userData?.me?.id === findData?.user?.id ? (
              <div className="comments-edit">
                <Link href={`/write/${findId}`}>
                  <div onClick={getPostData}>
                    <a>수정</a>
                  </div>
                </Link>
                <div onClick={e => DeletePostSubmit(e, findId)}>삭제</div>
              </div>
            ) : (
              ''
            )}
          </div>
          <CommentForm
            findId={findId}
            handleSubmit={handleSubmit}
            getText={getText}
            textOnChange={textOnChange}
            userData={userData}
            onClickNotify={onClickNotify}
            onClickNotifyCheckString={onClickNotifyCheckString}
          />

          {getComments.map((el, id) => (
            <>
              <div key={id}>
                <Comments
                  el={el}
                  editComment={editComment}
                  editText={editText}
                  editCommentInput={editCommentInput}
                  toggle={toggle}
                  on={on}
                  EditCommentSubmit={EditCommentSubmit}
                  fixComment={fixComment}
                  DeleteCommentSubmit={DeleteCommentSubmit}
                  setIsopen={setIsopen}
                  userData={userData}
                  onClickNotifyCheckString={onClickNotifyCheckString}
                />
              </div>

              {el.id == isOpen && on ? (
                <>
                  <SubCommentsForm
                    userData={userData}
                    subHandleSubmit={subHandleSubmit}
                    findData={findData}
                    onClickNotify={onClickNotify}
                    isOpen={isOpen}
                    on={on}
                    toggle={toggle}
                    onClickNotifyCheckString={onClickNotifyCheckString}
                  />
                </>
              ) : (
                ''
              )}
              {getComments.map((ele, id) => (
                <>
                  <SubComments
                    ele={ele}
                    el={el}
                    subEditText={subEditText}
                    editSubCommentInput={editSubCommentInput}
                    EditCommentSubmit={EditCommentSubmit}
                    DeleteCommentSubmit={DeleteCommentSubmit}
                    userData={userData}
                    findData={findData}
                    onClickNotifyCheckString={onClickNotifyCheckString}
                  />
                </>
              ))}
            </>
          ))}
        </div>
      </PostPageTap>
    </>
  );
}

export default PostPage;
