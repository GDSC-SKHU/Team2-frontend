import router from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { nameState } from '../store/store';
import Image from 'next/image';
type LoginResponse = boolean;

export default function Index() {
  const [name, setName] = useState<string>('');
  const [globalName, setGlobalName] = useRecoilState(nameState);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post<LoginResponse>('http://happy-rabbit.duckdns.org/', {
        name: name,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setGlobalName(name);
          router.push('/game');
        } else {
          alert('삐!!!!!! 이름을 쓰라고!!!!!');
        }
      });
  };

  const onClickRank = () => {
    router.push({
      pathname: '/Ranking',
    });
  };

  return (
    <Container>
      <StyledBox onSubmit={onSubmit}>
        <StyledH1>
          신학기가 시작되자 긍정 에너지가 필요한 <br /> 토끼는 긍정적이 삶을 위한 여정을 떠난다.
        </StyledH1>
        <Nickname>
          <StyledH2>네 이름을 입력하렴 &#40;&#94;&#94;&#41;7</StyledH2>
          <StyledInput type='text' onChange={onChangeName} value={name} />
        </Nickname>
        <ImgBox>
          <Image src='/rabbit.png' alt='토끼' width={400} height={400} />
        </ImgBox>
        <ButtonDiv>
          <Button type='submit' disabled={name.length !== 3}>
            시작
          </Button>
          <Button type='button' onClick={onClickRank}>
            랭킹
          </Button>
        </ButtonDiv>
      </StyledBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  text-align: center;

  font-size: 2rem;
`;

const Nickname = styled.div`
  margin-top: 3vh;

  font-size: 2rem;
`;

const StyledH2 = styled.div`
  margin-bottom: 1vh;
`;

const ImgBox = styled.div`
  width: 400px;
  height: 400px;

  overflow: hidden;
`;

const StyledInput = styled.input`
  width: 20vw;
  height: 50px;
  font-size: 30px;

  margin-bottom: 3vh;
  margin-left: 2vw;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 10vw;
  height: 64px;

  margin-right: 1vw;
  margin-left: 1vw;

  font-size: 2rem;
  text-align: center;

  border-radius: 5px;
  border-color: #f7adb9;
  background-color: #f7adb9;
  color: white;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
  }
`;
