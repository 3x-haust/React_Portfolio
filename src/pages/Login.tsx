import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import fireAuth from "../utils/firebase/fireAuth";

const Container = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-image: url('images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LoginWithGoogle = styled.button`
  display: block;
  margin: auto;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #cccccc;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #aaaaaa;
  }
`;

export default function Login() {

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(fireAuth, provider);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container>
      <LoginWithGoogle onClick={handleGoogleLogin}>Google Login</LoginWithGoogle>
    </Container>
  );
}