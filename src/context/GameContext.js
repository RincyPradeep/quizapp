import {createContext, useState} from 'react'

const GameContext = createContext()

export default GameContext

export const GameProvider = ({children})=>{

    const [questions,setQuestions] = useState([])
    const [questionNumber,setQuestionNumber] = useState(1)
    const [scores,setScores] = useState([])
    const [correct,setCorrect] = useState(false)
    const [showAnswer,setShowAnswer] = useState(false)
    const [isTimeUp,setIsTimeUp] = useState(false)
    const [wrong,setWrong] = useState(false)
    const [gamesPlayed,setGamesPlayed] = useState(0)
    const [questionsAnswered,setQuestionsAnswered] = useState(0)
    const [correctAnswers,setCorrectAnswers] = useState(0)
    const [wrongAnswers,setWrongAnswers] = useState(0)
    const [gamesWon,setGamesWon] = useState(0)
    const [moneyEarned,setMoneyEarned] = useState(0)  

    let contextData = {
        questions : questions,
        questionNumber : questionNumber,
        scores : scores,
        correct : correct,
        showAnswer : showAnswer,
        isTimeUp : isTimeUp,
        wrong : wrong,
        gamesPlayed : gamesPlayed,
        questionsAnswered : questionsAnswered,
        wrongAnswers : wrongAnswers,
        correctAnswers : correctAnswers,
        gamesWon : gamesWon,
        moneyEarned : moneyEarned,
        setQuestions : setQuestions,
        setQuestionNumber : setQuestionNumber,
        setScores : setScores,
        setCorrect : setCorrect,
        setShowAnswer : setShowAnswer,
        setIsTimeUp : setIsTimeUp,
        setWrong : setWrong,
        setGamesPlayed : setGamesPlayed,
        setQuestionsAnswered : setQuestionsAnswered,
        setWrongAnswers : setWrongAnswers,
        setCorrectAnswers : setCorrectAnswers,
        setGamesWon : setGamesWon,
        setMoneyEarned : setMoneyEarned
    }

    return(
        <GameContext.Provider value={contextData}>
            {children}
        </GameContext.Provider>
    )
}