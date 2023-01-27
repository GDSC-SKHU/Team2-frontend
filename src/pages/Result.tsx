import router from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { nameState, scoreState, textState } from '../store/store';

export default function Result() {
  const [sentence, setSentence] = useState<string>('');
  const globalName = useRecoilValue(nameState);
  const [globalScore, setGlobalScore] = useRecoilState(scoreState);
  const [globalText, setGlobalText] = useRecoilState(textState);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  const onSave = () => {
    setGlobalText(sentence);
    router.push({
      pathname: '/Ranking',
      query: { sentence: sentence },
    });
  };

  return (
    <Container>
      <StyledDiv>
        <StyledFont>
          이름: {globalName}
          <br />
        </StyledFont>
        <StyledFont>
          점수
          <br />
          {globalScore}
          <br />
        </StyledFont>
        <div>
          <input type='text' onChange={onChangeInput} value={sentence} />
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

const StyledFont = styled.div`
  text-align: center;
  font-size: 3rem;
  color: #f7adb9;
`;
