import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Moment from 'react-moment';
import './index.module.css';
import media from '../../lib/styles/media';
import { capitalize } from '../../utils/capitalize';

const PostCardTap = styled.div<{
  large: boolean;
  thumbnail: string;
}>`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 1rem;
  .post-wrapper {
    width: ${props => (props.large ? '450px' : '320px')};
    margin: 0 auto;
    height: ${props => (props.large ? '420px' : '350px')};
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(10, 33, 65, 0.05), 0px 0px 2px rgba(0, 0, 0, 0.13);
    margin-bottom: 3rem;
    background: #fff;
    transition: all 0.5s ease;
    border-bottom-left-radius: 0;
    &: hover {
      box-shadow: 0 5px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-10px);
      cursor: pointer;
      opacity: 1;
    }
    ${media.custom(600)} {
      width: ${props => (props.large ? '350px' : '350px')};
    }
    ${media.custom(430)} {
      width: ${props => (props.large ? '300px' : '300px')};
      height: ${props => (props.large ? '250px' : '250px')};
      padding-bottom: 7rem;
    }
    ${media.custom(380)} {
      width: ${props => (props.large ? '260px' : '260px')};
      height: ${props => (props.large ? '180px' : '180px')};
    }
  }

  .tag {
    position: absolute;
  }
  .intro-wrapper {
    display: flex;
    border: 1px solid red;
  }
  .withoutImg {
    padding: 0 16px;
    height: 105px;
    background: #fff;
  }
  .withImg {
    padding: 0 16px;
    height: 105px;
    background: #fff;
  }
  .smallImg {
    object-fit: cover;
    width: 320px;
    height: 200px;
    ${media.custom(600)} {
      width: ${props => (props.large ? '350px' : '350px')};
    }
    ${media.custom(430)} {
      width: 300px;
      height: 200px;
    }
    ${media.custom(380)} {
      width: 260px;
      height: 140px;
    }
  }

  h4 {
    font-size: 1rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    color: rgb(33, 37, 41);
    font-weight: bold;
    margin-top: 16px;
  }
  .timeFormat {
    font-size: 0.75rem;
    line-height: 1.5;
    color: rgb(134, 142, 150);
    display: flex;
  }

  .exPost {
  }
`;

const MadeBy = styled.div`
  height: 36px;
  position: relative;

  .made-by {
    margin-top: 16px;
  }
  .madeBy {
    padding: 0 16px;
    font-size: 0.75rem;
    color: rgb(134, 142, 150);
  }

  .username {
    font-size: 0.8rem;
    font-weight: bold;
    color: rgb(33, 37, 41);
  }
`;
type userType = {
  id: string;
  username: string;
};

export type PostCardProps = {
  id?: string;
  tag?: string;
  name?: string;
  date?: string;
  title?: string;
  body?: string;
  large?: boolean;
  thumbnail?: string;
  user?: userType;
  created_at?: Date;
  views?: number;
  comments?: string[];
  isBig?: boolean;
  isSmall?: boolean;
  data?: any;
};

function PostCard({ data, large }: PostCardProps) {
  return (
    <PostCardTap large={large}>
      {data?.map((i, id) => (
        <Link href={`/blog/${i.id}`} as={`/blog/${i.id}`} key={id} passHref>
          <div className="post-wrapper">
            <div>
              <div className="tag">{i.tag}</div>
              {i.thumbnail ? <img src={i.thumbnail} className="smallImg" /> : ''}
              {i.thumbnail ? (
                <div className="withImg">
                  <h4>{capitalize(i.title)}</h4>
                  <div className="timeFormat">
                    <Moment fromNow>{i.created_at}</Moment>
                    {/* <div>{props.views}</div> */}&nbsp;&nbsp;
                    <div> {i.comments.length}개의 댓글</div>
                  </div>
                  <br />
                </div>
              ) : (
                <div className="withoutImg">
                  <h4>{capitalize(i.title)}</h4>
                  <div className="timeFormat">
                    <Moment fromNow>{i.created_at}</Moment>
                    {/* <div>{props.views}</div> */}&nbsp;&nbsp;
                    <div> {i.comments.length}개의 댓글</div>
                  </div>
                  <br />
                </div>
              )}
            </div>
            <MadeBy>
              <div>
                <span className="madeBy">
                  MadeBy <span className="username"> {i.user.username}</span>
                </span>
              </div>
            </MadeBy>
          </div>
        </Link>
      ))}
    </PostCardTap>
  );
}

export default PostCard;
