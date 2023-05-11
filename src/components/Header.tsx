import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout, onUserStateChange } from "../api/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function Header({ user, setUser }: Props): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  const clickLogIn = () => {
    navigate("/login");
  };

  const clickLogOut = () => {
    const conFirm = confirm("정말 로그아웃 하시겠습니까?");
    if (conFirm) {
      logout().then(setUser);
      navigate("/");
    }
  };

  const clickHome = () => {
    navigate("/");
  };

  const clickShare = () => {
    navigate("/share");
  };

  const clickMy = () => {
    navigate("/my");
  };

  return (
    <>
      <Nav>
        <NavLeft>
          <NavEl onClick={clickHome}>홈</NavEl>
          <NavEl>img</NavEl>
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
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(47, 52, 55);
  cursor: pointer;
  color: #ffffffe6;
  font-weight: bold;
  width: 100%;
  border-bottom: 1px solid #828282;
`;
const NavEl = styled.div`
  &:hover {
    color: #669dfd;
  }
  padding: 10px 20px;
  margin: 0 40px;
  text-align: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
`;
