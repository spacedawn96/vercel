import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditorMain from 'src/components/Editor/TextEditor';
import { useToasts } from 'react-toast-notifications';

const WriteTap = styled.div``;

export type WriteProps = {};

function Write(props: WriteProps) {
  const { addToast } = useToasts();

  const firstNotifications = () => {
    addToast('이미지를 잡아당기면 크기가 늘어납니다', {
      appearance: 'info',
      autoDismiss: true,
    });
  };
  useEffect(() => {
    const isData = window.localStorage.getItem('img');
    if (isData) {
    } else {
      firstNotifications();
    }
    window.localStorage.setItem('img', 'img');
    window.onunload = () => {
      window.localStorage.clear();
    };
  }, []);
  return (
    <>
      <EditorMain />
    </>
  );
}

export default Write;
