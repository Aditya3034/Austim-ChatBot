import React from 'react';

const BooleanOptions = (props) => {
    const handleClick = (response) => {
        props.actions.handleUserResponse(response, props.state.checker, props.state.userData);
    };

    return (
        <div>
            <button  className='start-btn' onClick={() => handleClick("Yes")}>Yes</button>
            <button  className='start-btn slow-btn' onClick={() => handleClick("No")}>No</button>
        </div>
    );
};

export default BooleanOptions;
