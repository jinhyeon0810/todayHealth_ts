import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout, onUserStateChange } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser } from "../../utils/Store";

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string }) => {
        dispatch(changeUser(user?.uid));
      });
    }
  }, [changeUser]);

  const clickLogIn = () => {
    navigate("/");
  };

  const clickLogOut = () => {
    const conFirm = confirm("정말 로그아웃 하시겠습니까?");
    if (conFirm) {
      logout();
      navigate("/");
    }
  };

  const moveToHome = () => {
    navigate("/main");
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
        <NavLeft></NavLeft>
        <NavRight>
          <NavEl onClick={moveToHome}>홈</NavEl>
          <NavEl onClick={moveToLocation}>위치</NavEl>
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
  background-color: rgba(0, 16, 22, 0.9);
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  z-index: 10;
  font-weight: bold;
  overflow: hidden;
`;
const NavEl = styled.div`
  &:hover {
    color: #669dfd;
  }
  padding: 10px 60px;
  color: #ffffffe6;
  text-align: center;

  @media (min-width: 654px) and (max-width: 955px) {
    padding: 10px 30px;
  }
  @media (min-width: 570px) and (max-width: 654px) {
    padding: 10px 20px;
  }
  @media (min-width: 447px) and (max-width: 654px) {
    padding: 10px 8px;
  }
  @media (min-width: 280px) and (max-width: 447px) {
    padding: 0px;
    font-size: 10px;
  }
  @media (max-width: 280px) {
    padding: 0px;
    font-size: 5px;
    overflow: hidden;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;
const NavLeft = styled.div`
  display: flex;
`;
