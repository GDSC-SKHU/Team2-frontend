import router from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { nameState } from '../store/store';

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

  const onclickRank = () => {
    router.push({
      pathname: '/Ranking',
    });
  };

  return (
    <Container>
      <StyledBox onSubmit={onSubmit}>
        <Nickname>
          이름
          <StyledInput type='text' onChange={onChangeName} value={name} />
        </Nickname>
        <ButtonDiv>
          {' '}
          <Button type='submit'>시작</Button>
          <Button onClick={onclickRank}>랭킹</Button>
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
  margin-top: 40vh;
`;

const Nickname = styled.div`
  width: 400px;
  font-size: 3rem;
  color: #f7adb9;
`;

const StyledInput = styled.input`
  width: 15vw;
  height: 60px;

  margin-bottom: 5vh;
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

  padding-top: 16px;
  margin-right: 1vw;
  margin-left: 1vw;

  font-size: 2rem;
  text-align: center;

  border-radius: 5px;
  background-color: #f7adb9;
  color: white;

  cursor: pointer;
`;
