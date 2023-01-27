import axios from 'axios';
import router from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { nameState, numScoreState, scoreState, textState } from '../store/store';
import Image from 'next/image';
export default function Result() {
  const [sentence, setSentence] = useState<string>('');
  const globalName = useRecoilValue(nameState);
  const [globalScore, setGlobalScore] = useRecoilState(scoreState);
  const [numGlobalScore, setNumGlobalScore] = useRecoilState(numScoreState);
  const [globalText, setGlobalText] = useRecoilState(textState);
  const [refNum, setRefNum] = useState<Number>(0);
  useEffect(() => {
    // if (globalName != null) {
    //   console.log(encodeURI(globalName));
    // }
    console.log(globalName);
    //! 유니코드 이슈 발생 (한글) -> 해결됨
    axios
      .get('http://happy-rabbit.duckdns.org/score', {
        params: { name: globalName },
      })
      .then((res) => {
        // console.log(res.data.name);
        // console.log(res.data.score);
        // console.log(res.data.text);
        setRefNum(res.data.score);
        if (globalScore != null) {
          console.log('globalScore != null');
          if (res.data.score < numGlobalScore) {
            console.log('신기록 작성!!!');
          } else {
            alert('기존 점수보다 낮은 점수입니다.');
          }
        } else {
          alert('점수 is null입니다');
        }
      });
  }, []);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  const onSave = () => {
    setGlobalText(sentence);
    if (refNum < numGlobalScore) {
      axios.patch('http://happy-rabbit.duckdns.org/score', {
        name: globalName,
        score: numGlobalScore,
        text: sentence,
      });
      router.push({
        pathname: '/Ranking',
      });
    } else {
      console.log('기존 점수보다 낮은 점수입니다. 점수 높여 오셔요!');
    }
  };

  return (
    <Container>
      <StyledDiv>
        <StyledH2>
          {globalName}이 {globalScore}점이에요! 잘했죠^^
        </StyledH2>
        <ImgBox>
          <Image src='/rabbit.png' alt='토끼' width={400} height={400} />
        </ImgBox>
        <div>
          <StyledInput type='text' onChange={onChangeInput} value={sentence} />
          <StyledFont onClick={onSave}>저장</StyledFont>
        </div>
      </StyledDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12vh;
`;

const StyledH2 = styled.div`
  text-align: center;
  font-size: 3rem;

  margin-bottom: 2vh;
`;

const StyledFont = styled.div`
  text-align: center;
  font-size: 3rem;
  color: #f7adb9;
`;

const ImgBox = styled.div`
  width: 400px;
  height: 400px;

  margin-bottom: 3vh;

  overflow: hidden;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 70px;
`;
