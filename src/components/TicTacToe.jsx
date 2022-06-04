import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import React, { useState, useEffect } from 'react'
import reactLogo from '../assets/react-js-logo.svg'
import vueLogo from '../assets/vue-js-logo.svg'

const TicTacToeWrapper = styled.div`
  display: flex;
  ${({ mobileOrTabletView }) => {
        return mobileOrTabletView ? (
            'flex-direction: column;'
        ) : (
            'flex-direction: row;'
        )
    }}
  justify-content: center;
  width: 100%;
`

const TicTacGrid = styled.table`
  ${({ mobileOrTabletView }) => {
        return mobileOrTabletView ? (
            'height: calc(80vw);' +
            'width: calc(80vw);'
        ) : (
            'height: calc(100vh - 260px);' +
            'width: calc(100vh - 260px);'
        )
    }}
  align-items: center;
  justify-items: center;
  border-spacing: 0px;
`
const WrapperCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 0;
    &:last-child{
        justify-content: flex-start;
    }
`

const Row = styled.tr`
    
`
const Column = styled.td`
    cursor: pointer;
    border: 1px solid black;
    background-size: cover;
    background-repeat: no-repeat;
    ${({ grayCase }) => grayCase ? 'filter: grayscale(80%);' : null}
    ${({ player }) => {
        switch (player) {
            case 'p1':
                return 'background-image : url(' + reactLogo + ');'
            case 'p2':
                return 'background-image : url(' + vueLogo + ');'
            default:
                return 'background-color : transparent ;'
        }
    }}
`
const HistoryColumn = styled.ul`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 300px);
    align-items: center;
    ${({ mobileOrTabletView }) => mobileOrTabletView ? null : 'margin-top: 80px;'}
`
const StepButton = styled.li`
    padding: 10px 20px;
    margin-bottom: 20px;
    list-style: none;
    cursor: pointer;
    background-color: #81c784;
    font-weight: 900;
    letter-spacing: 0.5px;
    font-size: 16px;
    color: #455a64;
    border-radius: 7px;
    border: none;
    transition: all .2s ease-out;
    &:hover{
        background-color: #71b075;
        transform: scale(1.02);
    }
`
const ErrorMessageWrapper = styled.div`
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ErrorMessage = styled.span`
    font-size: 16px;
    text-align: center;
`
const ResetButton = styled.button`
    font-size: 25px;
    color: #2f2f2f;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: 'Roboto Mono', Arial;
    border-radius: 10px;
    padding: 12px 28px;
    background: #80deea;
    border: none;
    transition: all .3s ease-out;
    &:hover{
        cursor: pointer;
        background: #72cbd7;
        transform: scale(1.02)
    }
`

//                        GAME

function TicTacToe() {

    const [currentPlayer, setCurrentPlayer] = useState('p1')
    const [winner, setWinner] = useState('none')
    const [beginnerPlayer, setBeginnerPlayer] = useState('p1')
    const [placementError, setPlacementError] = useState(false)
    const [table, setTable] = useState(Array(9).fill('none'))
    const [tableHistory, setHistory] = useState({})
    const [lap, setLap] = useState(1)
    const [winCases, setWinCases] = useState(Array(9).fill(true))

    const isMobileOrTablet = useMediaQuery({ query: '(max-width: 980px)' })

    function resetGame() {
        setTable(Array(9).fill('none'))
        setPlacementError(false)
        setWinner('none')
        setLap(1)
        setBeginnerPlayer(beginnerPlayer === 'p1' ? 'p2' : 'p1')
        setWinCases(Array(9).fill(true))
        setHistory({})
    }

    function hasWin(player) {
        const arrayTable = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]]
        let hasWin = false
        for (let row = 0; row <= 2; row++) {
            if (table[arrayTable[row][0]] === player && table[arrayTable[row][1]] === player && table[arrayTable[row][2]] === player) {
                hasWin = true;
            }
        }
        for (let col = 0; col <= 2; col++) {
            if (table[arrayTable[0][col]] === player && table[arrayTable[1][col]] === player && table[arrayTable[2][col]] === player) {
                hasWin = true;
            }
        }
        if (table[arrayTable[0][0]] === player && table[arrayTable[1][1]] === player && table[arrayTable[2][2]] === player) {
            hasWin = true;
        }
        if (table[arrayTable[0][2]] === player && table[arrayTable[1][1]] === player && table[arrayTable[2][0]] === player) {
            hasWin = true;
        }

        return hasWin
    }

    function isGameEnd() {
        let isGameEnd = true;
        table.forEach((tableCase) => {
            if (tableCase === 'none') {
                isGameEnd = false
            }
        })
        if (hasWin('p1') || hasWin('p2')) {
            isGameEnd = true
        }
        return isGameEnd
    }

    function findLastPlayerPlayed() {
        let lastPlayerPlayed
        if (beginnerPlayer === 'p1') {
            if ((lap - 1) % 2 === 0) { lastPlayerPlayed = 'p2' }
            else { lastPlayerPlayed = 'p1' }
        }
        else if (beginnerPlayer === 'p2') {
            if ((lap - 1) % 2 === 0) { lastPlayerPlayed = 'p1' }
            else { lastPlayerPlayed = 'p2' }
        }
        return lastPlayerPlayed
    }

    function changeStep(step) {
        setLap(parseInt(step) + 1)
        let newHistory = { ...tableHistory }
        for (let i = 9; i > step; i--) {
            delete newHistory[i]
        }
        setWinner('none')
        setWinCases(Array(9).fill(true))
        setHistory(newHistory)
        setTable(newHistory[step])
    }

    useEffect(() => {
        if (isGameEnd) {
            if (hasWin(currentPlayer)) {
                setWinner(currentPlayer)
            }
        }
        let lastPlayer = findLastPlayerPlayed()
        setCurrentPlayer(lastPlayer === 'p1' ? 'p2' : 'p1')
    }, [table])

    function getCaseNumber(e) {
        return parseInt(e.target.className.split(' ')[2][4])
    }

    function game(e) {
        if (!isGameEnd()) {
            let caseNumber = getCaseNumber(e)
            let tempTable = [...table]
            if (table[caseNumber] === 'none') {
                tempTable[caseNumber] = currentPlayer
                setTable(tempTable)
                setHistory({ ...tableHistory, [lap]: tempTable })
                setLap(lap + 1)
                setPlacementError(false)
            }
            else {
                setPlacementError(true)
            }
        }
    }

    function MessageLabel() {
        if (isGameEnd()) {
            if (winner === 'p1' || winner === 'p2') { return <h2>🥇 Le {winner === 'p1' ? 'joueur 1' : 'joueur 2'} a gagné ! 🥇</h2> }
            else if (winner === 'none') { return <h2>Égalité, personne n'a gagné</h2> }
        }
        else { return <h2>C'est au tour de {currentPlayer === 'p1' ? 'joueur 1' : 'joueur 2'} !</h2> }
    }

    return (
        <TicTacToeWrapper mobileOrTabletView={isMobileOrTablet}>
            <WrapperCol>
                <ResetButton onClick={resetGame}>Reset</ResetButton>
            </WrapperCol>
            <WrapperCol>
                <MessageLabel />
                <TicTacGrid mobileOrTabletView={isMobileOrTablet}>
                    <Row>
                        <Column className='case0' grayCase={!winCases[0]} player={table[0]} onClick={game} />
                        <Column className='case1' grayCase={!winCases[1]} player={table[1]} onClick={game} />
                        <Column className='case2' grayCase={!winCases[2]} player={table[2]} onClick={game} />
                    </Row>
                    <Row>
                        <Column className='case3' grayCase={!winCases[3]} player={table[3]} onClick={game} />
                        <Column className='case4' grayCase={!winCases[4]} player={table[4]} onClick={game} />
                        <Column className='case5' grayCase={!winCases[5]} player={table[5]} onClick={game} />
                    </Row>
                    <Row>
                        <Column className='case6' grayCase={!winCases[6]} player={table[6]} onClick={game} />
                        <Column className='case7' grayCase={!winCases[7]} player={table[7]} onClick={game} />
                        <Column className='case8' grayCase={!winCases[8]} player={table[8]} onClick={game} />
                    </Row>
                </TicTacGrid>
                <ErrorMessageWrapper>
                    {placementError && <ErrorMessage>❌ Vous ne pouvez pas vous placer ici ❌</ErrorMessage>}
                </ErrorMessageWrapper>
            </WrapperCol>
            <WrapperCol>
                <HistoryColumn mobileOrTabletView={isMobileOrTablet}>
                    {Object.keys(tableHistory).slice(0, -1).map((index) =>
                        <StepButton
                            onClick={() => changeStep(index)}
                            key={index.toString()}>Étape {index.toString()}
                        </StepButton>
                    )}
                </HistoryColumn>
            </WrapperCol>
        </TicTacToeWrapper>
    )
}


export default TicTacToe