import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout, onUserStateChange } from "../../api/firebase";

type User = { uid: string };

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  user?: { uid: string };
}
export default function Header({ user, setUser }: Props): React.ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    if (setUser) {
      onUserStateChange((user: { uid: string }) => {
        setUser(user);
      });
    }
  }, [setUser]);

  const clickLogIn = () => {
    navigate("/login");
  };

  const clickLogOut = () => {
    const conFirm = confirm("정말 로그아웃 하시겠습니까?");
    if (conFirm) {
      logout();
      navigate("/");
    }
  };

  const moveToHome = () => {
    navigate("/");
  };

  const clickShare = () => {
    navigate("/share");
  };

  const clickMy = () => {
    navigate("/my");
  };

  const moveToSignUpPage = () => {
    navigate("/signup");
  };

  const moveToLocation = () => {
    if (user) {
      navigate("/location");
    } else {
      alert("로그인 하셔야 이용 가능합니다 🙂");
    }
  };

  return (
    <>
      <Nav>
        <NavLeft>
          <NavEl onClick={moveToHome}>홈</NavEl>
          <NavEl onClick={moveToLocation}>위치</NavEl>
        </NavLeft>
        <NavRight>
          <NavEl onClick={clickShare} style={{ margin: "0 20px" }}>
            오.운.완 <br />
            <span style={{ fontSize: "13px" }}>게시판</span>
          </NavEl>
          {!user && (
            <NavEl onClick={clickLogIn} style={{ margin: "0 20px" }}>
              로그인
            </NavEl>
          )}
          {!user && (
            <NavEl onClick={moveToSignUpPage} style={{ margin: "0 20px" }}>
              회원가입
            </NavEl>
          )}

          {user && (
            <NavEl onClick={clickLogOut} style={{ margin: "0 20px" }}>
              로그아웃
            </NavEl>
          )}
          {user && (
            <NavEl onClick={clickMy} style={{ margin: "0 20px" }}>
              나의 <br />
              운동일지
            </NavEl>
          )}
        </NavRight>
      </Nav>
    </>
  );
}

const Nav = styled.div`
  position: fixed;
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(73, 77, 79);
  cursor: pointer;
  color: #ffffffe6;
  font-weight: bold;
  width: 100%;
  border-bottom: 1px solid #828282;
  color: white;
  z-index: 10;
  font-weight: bold;
`;
const NavEl = styled.div`
  &:hover {
    color: #669dfd;
  }
  padding: 10px 60px;

  text-align: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
`;
