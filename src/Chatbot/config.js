import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from './components/Avatar';
import StartBtn from './components/StartBtn';
import StartSlow from './components/StartSlow';
import data from './data';
import DipslayImage from './components/DipslayImage';
import BooleanOptions from './components/BooleanOptions';
import CustomOptionsWidget from './components/CustomOptionsWidget';

const config = {
    botName: "Chatbot",
    initialMessages: [createChatBotMessage(`Welcome to our Chatbot!`, {
        widget: "startBtn"
    })],
    customComponents: {
        botAvatar: (props) => <Avatar {...props} />,
    },
    state: {
        currentQuestionIndex: null, // Initialize to null or 0
        data,
        userData: {
            name: "",
            age: 0,
            gender: "",
            delayedSpeech: false,
            socialInteractionIssues: false,
            repetitiveBehaviors: false,
            sensitivity: false,
            birthHistory: "",
            birthWeight: "",
            complications: "",
            rolledOver: 0,
            satWithoutSupport: 0,
            walkedIndependently: 0,
            firstWords: 0,
            limitedVocabulary: false,
            earInfections: false,
            illnesses: false,
            familyHistory: false,
            neurologicalDisorders: false,
            livingSituation: "",
            siblingsCount: 0,
            educationProgram: "",
            peerInteractions: false,
            eyeContact: false,
            handFlapping: false,
            cranialNerves: false,
            motorFunction: "",
            sensoryFunction: "",
            coordination: "",
            conversationDifficulty: false,
            intenseInterests: false,
            repetitiveMovements: false,
            hearingTest: "",
            geneticTesting: "",
            neuroImaging: "",
        },
    },
    widgets: [
        {
            widgetName: "startBtn",
            widgetFunc: (props) => <StartBtn {...props} />,
        },
        {
            widgetName: "startSlow",
            widgetFunc: (props) => <StartSlow {...props} />,
        },
        {
            widgetName: "booleanOptions",
            widgetFunc: (props) => <BooleanOptions {...props} />, // Add the BooleanOptions widget
        },
        {
            widgetName: "customOptions",
            widgetFunc: (props) => <CustomOptionsWidget {...props} />,
        },
        {
            widgetName: "finalImage",
            widgetFunc: (props) => <DipslayImage {...props} />,
        },
    ]
};

export default config;
