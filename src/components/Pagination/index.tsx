import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PaginationTap = styled.div`
  color: #545454;
  font-size: 20px;
  letter-spacing: -0.017em;
  padding: 30px;
  transition: 0.25s;
  background: rgba(236, 239, 243, 0.5);
  z-index: 20;
  line-height: 1.5;
  .list-wrapper {
    display: flex;
    justify-content: space-around;
    width: 15%;
    margin: 0 auto;
  }
  .ul-list {
    display: flex;
  }
`;

export type PaginationProps = {
  datas: number;
  postsPerPage: number;
  setCurrentPage: (e: number) => void;
};

function Pagination(props: PaginationProps) {
  const paginate = pageNumber => props.setCurrentPage(pageNumber);

  const pageNumbers = [];
  const totalPosts = props.datas;

  for (let i = 1; i <= Math.ceil(totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationTap>
      <ul className="ul-list">
        <div className="list-wrapper">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <Link as={`/${number}`} href={`/`}>
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </PaginationTap>
  );
}

export default Pagination;
