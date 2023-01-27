import router from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { nameState, scoreState } from '../store/store';

const Game = () => {
  const [name, setName] = useState<String>('');
  const [globalScore, setGlobalScore] = useRecoilState(scoreState);
  const globalName = useRecoilValue(nameState);

  const onClickUp = () => {
    const num = Math.floor(Math.random() * 1000) * 1000;
    setGlobalScore(num.toLocaleString());
  };

  const toResult = () => {
    router.push('/Result');
  };

  return (
    <>
      <h1>{globalName}</h1>
      <h1>{globalScore}</h1>
      <button onClick={onClickUp}>새뱃돈 받기</button>
      <button onClick={toResult}>결과 페이지 가기</button>
    </>
  );
};
export default Game;
