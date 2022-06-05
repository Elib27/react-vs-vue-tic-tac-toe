import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import './App.css';
import TicTacToe from './components/TicTacToe'
import reactLogo from './assets/react-js-logo.svg'
import vueLogo from './assets/vue-js-logo.svg'

const Title = styled.h1`
  width: 100%;
  ${({mobileView}) => {
    return mobileView ? "font-size: 40px;" : "font-size: 50px;"
  }}
  font-weight: 500;
  text-align: center;
  margin : 40px 0 10px 0;
`

const VueLogoBG = styled.div`
  background-image: url('${vueLogo}');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  height: min(75vh, 48vw);;
  width: min(75vh, 48vw);;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(20%, -50%);
  z-index: -10;
`
const ReactLogoBG = styled.div`
  background-image: url('${reactLogo}');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  height: min(70vh, 45vw);
  width: min(70vh, 45vw);;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-20%, -50%);
  z-index: -10;
`


function App() {
  const isMobile = useMediaQuery({ maxWidth: 480})
  return (
    <div>
    <ReactLogoBG />
    <VueLogoBG />
    <Title mobileView={isMobile}>Tic Tac Toe</Title>
    <TicTacToe />
    </div>
  );
}

export default App;
