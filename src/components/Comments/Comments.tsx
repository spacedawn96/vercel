import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { checkEmpty } from 'src/utils/isNull';
import { MeQuery } from 'src/types/apolloComponent';

const CommentsTap = styled.div``;

export type CommentsProps = {
  el: any;
  editComment: boolean;
  editText: string;
  editCommentInput: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsopen: React.Dispatch<React.SetStateAction<string>>;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  on: boolean;
  EditCommentSubmit: (e: any, commentId: string, text: string) => Promise<void>;
  fixComment: () => void;
  DeleteCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
  userData: MeQuery;
  onClickNotifyCheckString: (e: any) => void;
};

function Comments(props: CommentsProps) {
  const [editComment, setEditComment] = useState(false);
  const [editSubComment, setEditSubComment] = useState(false);
  const [editText, setEditText] = useState('');

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
  };

  return (
    <>
      {props.el.reply ? (
        ''
      ) : (
        <div>
          <div className="comments-layout">
            <div>User {props.el.user?.username}</div>
            <div className="comments-text">
              {editComment ? (
                <form
                  onSubmit={e => {
                    checkEmpty(editText)
                      ? props.onClickNotifyCheckString(e)
                      : props.EditCommentSubmit(e, props.el.id, editText);
                    checkEmpty(editText) ? e.preventDefault() : fixComment();
                  }}>
                  <input
                    name="text"
                    value={editText}
                    onChange={editCommentInput}
                    type="text"
                    placeholder="????????? ??????????????????"
                  />
                </form>
              ) : (
                props.el.text
              )}
            </div>

            <div className="comment-write-button">
              <div className="edit-button">
                <IoIosAddCircleOutline
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}
                />
                <div
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}>
                  ?????? ??????
                </div>
              </div>

              {props.userData?.me?.id == props.el.user.id ? (
                <div className="edit-button">
                  {editComment ? (
                    <>
                      <div
                        onClick={e => {
                          checkEmpty(editText)
                            ? props.onClickNotifyCheckString(e)
                            : props.EditCommentSubmit(e, props.el.id, editText);
                          checkEmpty(editText) ? e.preventDefault() : fixComment();
                        }}>
                        ??????
                      </div>
                      <div onClick={fixComment}>??????</div>
                    </>
                  ) : (
                    <div className="edit-button">
                      <div onClick={fixComment}>??????</div>
                      <div onClick={e => props.DeleteCommentSubmit(e, props.el.id)}>
                        ??????
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <RiArrowDropDownLine />
        </div>
      )}
    </>
  );
}

export default Comments;
