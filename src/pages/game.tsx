import router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { nameState, numScoreState, scoreState } from '../store/store';
import Image from 'next/image';
import axios from 'axios';
import { RankPerson } from '../types/person';
const Game = () => {
  const [currPerson, setCurrPerson] = useState<RankPerson | null>(null);
  const [globalScore, setGlobalScore] = useRecoilState(scoreState);
  const globalName = useRecoilValue(nameState);
  const [numGlobalScore, setNumGlobalScore] = useRecoilState(numScoreState);

  useEffect(() => {
    const getCurrUser = async () => {
      const response = await axios.get<RankPerson>(`http://happy-rabbit.duckdns.org/score?name=${globalName}`);
      setCurrPerson(response.data);
    };

    getCurrUser();
  }, []);

  const onClickUp = () => {
    const num = Math.floor(Math.random() * 1000) * 1000;

    setCurrPerson((prev) => prev && { ...prev, score: num });
  };

  const toResult = () => {
    if (currPerson) {
      setNumGlobalScore(currPerson.score);
      setGlobalScore(currPerson.score.toLocaleString());
    }
    router.push('/Result');
  };

  return (
    <Container>
      <NameDiv>
        <StyledName>
          <Image src='/rabbit.png' alt='토끼' width={50} height={50} />
          {globalName}
          <Image src='/rabbit.png' alt='토끼' width={50} height={50} />
        </StyledName>
      </NameDiv>
      <ScoreDiv>
        <StyledScore>{currPerson?.score}</StyledScore>
      </ScoreDiv>

      <div>
        <Button onClick={onClickUp}>새뱃돈 받기</Button>
        <Button onClick={toResult}>결과 페이지 가기</Button>
      </div>
    </Container>
  );
};
export default Game;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NameDiv = styled.div`
  height: 150px;
`;

const StyledName = styled.h2`
  font-size: 4rem;
`;

const StyledScore = styled.h2`
  font-size: 7rem;
`;

const ScoreDiv = styled.div`
  height: 350px;
`;

const Button = styled.button`
  width: 10vw;
  height: 64px;

  margin-right: 1vw;
  margin-left: 1vw;

  font-size: 1rem;
  text-align: center;

  border-radius: 5px;
  border-color: #f7adb9;
  background-color: #f7adb9;
  color: white;

  cursor: pointer;
`;
