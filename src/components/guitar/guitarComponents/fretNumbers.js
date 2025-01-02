import React from 'react';

const FretNumbers = () => {

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',  // Centers the items vertically
        }}>
            {/* Move 0 away from far left */}
            <div style={{
                width: '5%',
                fontSize: '25px',
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                alignItems: 'center',     // Centers vertically
            }}>
                0
            </div>
            {/* Numbers 1-12 */}
            <div style={{
                display: 'flex',
                flex: '1',
                justifyContent: 'center',  // Centers horizontally
                alignItems: 'center',      // Centers vertically
            }}>
                {[...Array(12)].map((_, index) => (
                    <div key={index} style={{
                        flex: '1',
                        fontSize: '25px',
                        display: 'flex',
                        justifyContent: 'center',  // Centers horizontally
                        alignItems: 'center',      // Centers vertically
                    }}>
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FretNumbers;
