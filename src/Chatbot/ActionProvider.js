import React, { useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { questions } from './questions';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const [isInResponseMode, setIsInResponseMode] = useState(false);

    const updateState = (message, checker) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }));
        console.log('State updated:', { checker });
    };

    const askNextQuestion = (currentIndex, userData) => {
        if (currentIndex < questions.length) {
            const question = questions[currentIndex];
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log(question);
            setState((prev) => ({
                ...prev,
                currentQuestion: question,
            }));
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            const message = createChatBotMessage(question.question, {
                widget: question.customOptions ? "customOptions" : (question.type === "boolean" ? "booleanOptions" : null),
                customOptions: question.customOptions // Pass custom options to the widget
            });
            updateState(message, currentIndex + 1);
        } else {
            processFinalData(userData);
        }
    };

    const handleUserResponse = async (response, checker, userData) => {
        if (isInResponseMode) {
            try {
                const apiResponse = await axios.post('/api/your-endpoint', { userInput: response });
                const apiMessage = apiResponse.data.message; // Adjust based on your API response structure
                const message = createChatBotMessage(apiMessage);
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, message]
                }));
            } catch (error) {
                console.error('Error handling user response:', error);
                const errorMessage = createChatBotMessage("There was an error processing your response. Please try again.");
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, errorMessage]
                }));
            }
        } else {
            if (typeof checker === 'number' && checker > 0 && checker <= questions.length) {
                const field = questions[checker - 1].field;
                userData[field] = response;
                setState((prev) => ({
                    ...prev,
                    userData,
                    currentQuestion: questions[checker - 1],
                }));
                console.log('User response:', { field, response, userData });
                askNextQuestion(checker, userData);
            } else {
                console.error("Checker value is out of bounds or undefined:", checker);
            }
        }
    };

    const processFinalData = async (userData) => {
        try {
            const response = await axios.post('/api/your-endpoint', userData);
            const apiMessage = response.data.message; // Adjust this based on your API response structure

            // Generate and send message based on API response
            const finalMessage = createChatBotMessage(apiMessage);
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, finalMessage]
            }));

            // Switch to response mode
            setIsInResponseMode(true);

            console.log("Data Array: ", userData);
        } catch (error) {
            console.error('Error processing final data:', error);
            const errorMessage = createChatBotMessage("There was an error processing your data. Please try again.");
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, errorMessage]
            }));
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        askNextQuestion,
                        handleUserResponse,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;


// import React, { useState } from 'react';
// import { createChatBotMessage } from 'react-chatbot-kit';
// import { questions } from './questions';
// import axios from 'axios';

// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//     const [isInResponseMode, setIsInResponseMode] = useState(false);

//     const updateState = (message, checker) => {
//         setState((prev) => ({
//             ...prev,
//             messages: [...prev.messages, message],
//             checker,
//         }));
//         console.log('State updated:', { checker });
//     };
    

//     const askNextQuestion = (currentIndex, userData) => {
//         if (currentIndex < questions.length) {
//             const question = questions[currentIndex];
//             console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//             console.log(question);
//             setState((prev) => ({
//                 ...prev,
//                 currentQuestion: question,
//             }));
//             console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//             const message = createChatBotMessage(question.question, {
//                 widget: question.customOptions ? "customOptions" : (question.type === "boolean" ? "booleanOptions" : null),
//                 customOptions: question.customOptions // Pass custom options to the widget
//             });
//             updateState(message, currentIndex + 1);
//         } else {
//             processFinalData(userData);
//         }
//     };

//     const handleUserResponse = (response, checker, userData) => {
//         if (typeof checker === 'number' && checker > 0 && checker <= questions.length) {
//             const field = questions[checker - 1].field;


//             userData[field] = response;
//             setState((prev) => ({
//                 ...prev,
//                 userData,
//                 currentQuestion: questions[checker - 1],
//             }));
//             console.log('User response:', { field, response, userData });
//             askNextQuestion(checker, userData);
//         } else {
//             console.error("Checker value is out of bounds or undefined:", checker);
//         }
//     };

//     // const processFinalData = (userData) => {
//     //     const dataArray = Object.values(userData);
//     //     const finalMessage = createChatBotMessage("Thank you for providing the information. We are processing your data now.");
//     //     setState((prev) => ({
//     //         ...prev,
//     //         messages: [...prev.messages, finalMessage]
//     //     }));
//     //     console.log("Data Array: ", dataArray);
//     // };

    
//     const processFinalData = async (userData) => {
//         try {
//             // Send userData to the API
//             const response = await axios.post('/api/your-endpoint', userData);
//             const apiMessage = response.data.message; // Adjust this based on your API response structure

//             // Generate and send message based on API response
//             const finalMessage = createChatBotMessage(apiMessage);
//             setState((prev) => ({
//                 ...prev,
//                 messages: [...prev.messages, finalMessage]
//             }));
//             console.log("Data Array: ", userData);
//         } catch (error) {
//             console.error('Error processing final data:', error);
//             const errorMessage = createChatBotMessage("There was an error processing your data. Please try again.");
//             setState((prev) => ({
//                 ...prev,
//                 messages: [...prev.messages, errorMessage]
//             }));
//         }
//     };

//     return (
//         <div>
//             {React.Children.map(children, (child) => {
//                 return React.cloneElement(child, {
//                     actions: {
//                         askNextQuestion,
//                         handleUserResponse,
//                     },
//                 });
//             })}
//         </div>
//     );
// };

// export default ActionProvider;
