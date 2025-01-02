import React from 'react';

const FretNumbers = () => {

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10px',
        }}>
            {/* Move 0 away from far left */}
            <div style={{width: '5%', fontSize: '25px'}}>0</div>
            {/* Numbers 1-12 */}
            <div style={{display: 'flex', flex: '1'}}>
                {[...Array(12)].map((_, index) => (
                    <div key={index} style={{flex: '1', fontSize: '25px'}}>
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FretNumbers;