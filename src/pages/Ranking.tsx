import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useLoading from '../hooks/useLoading';
import { RankPerson } from '../types/person';

// const MOCK: RankPerson[] = [
//   { id: 1, name: '오혜성', score: 1234, text: '잘 놀다 갑니다 ~' },
//   { id: 2, name: '오혜성', score: 1234, text: '잘 놀다 갑니다 ~' },
//   { id: 3, name: '오혜성', score: 1234, text: '잘 놀다 갑니다 ~' },
//   { id: 4, name: '오혜성', score: 1234, text: '잘 놀다 갑니다 ~' },
// ];

export default function Ranking() {
  const { isLoading, loadingEnd } = useLoading({});
  const [rankPerson, setRankPerson] = useState<RankPerson[]>([]);

  useEffect(() => {
    const getRank = async () => {
      const response = await axios.get<RankPerson[]>('http://happy-rabbit.duckdns.org/rank');
      setRankPerson(response.data.slice(0, 20));
      loadingEnd();
    };

    getRank();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <div>로딩중ㅋ</div>
      ) : (
        rankPerson.map((eachPerson, index) => (
          <Article key={eachPerson.id}>
            <PersonWrapper>
              <StyledDiv>
                {index + 1}등, {eachPerson.name}
              </StyledDiv>
              <StyledDiv>점수 : {eachPerson.score}</StyledDiv>
            </PersonWrapper>
            <StyledDiv>{eachPerson.text}</StyledDiv>
          </Article>
        ))
      )}

      <RetryLink href='/'>다시 하기</RetryLink>

      <ImgWrapper>
        <Image src='/rabbit.png' alt='토끼' width={400} height={400} />
      </ImgWrapper>
      <ImgWrapper style={{ top: '300px', left: '10px' }}>
        <Image src='/rabbit.png' alt='토끼' width={400} height={400} />
      </ImgWrapper>
    </Wrapper>
  );
}
const StyledDiv = styled.div`
  color: white;
`;
const Wrapper = styled.main`
  color: white;
  padding-top: 30px;
  padding-bottom: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  font-size: 20px;
`;

const Article = styled.article`
  color: white;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PersonWrapper = styled.div`
  color: white;
  display: flex;
  gap: 12px;
`;

const RetryLink = styled(Link)`
  padding: 14px 20px;

  border-radius: 5px;
  border-color: #f7adb9;
  background-color: #f7adb9;
  color: white;
`;

const animation = keyframes`
0% {
  transform: translateY(10px) rotateZ(-12deg);
}

50% {
  transform: rotateZ(12deg) translateY(-10px);
}

70% {
  transform: translateY(8px) rotateZ(7deg);
}

100% {
  transform: translateY(-8px) rotateZ(-7deg);
}
`;

const ImgWrapper = styled.div`
  position: fixed;
  right: 40px;
  top: 100px;
  animation: ${animation} 1s ease-in-out infinite;
`;

// () => ()

// () => {return 1}
// () => (1)
// () => 1
