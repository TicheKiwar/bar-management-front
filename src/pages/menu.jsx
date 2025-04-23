import BarMenu from '../components/organismos/BarMenu';
import styled from "styled-components";

export function Menu() {
  return (
    <Main>

      <BarMenu />
    </Main>
  );
}
const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-size:26px;
  
`;