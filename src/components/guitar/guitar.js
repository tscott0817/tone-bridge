import React from 'react';
import {useNoteContext} from "../../stateManager/NoteContext";
import Neck from "./neck";
import HeadStock from "./headStock";

const Guitar = () => {

    return (
        <div className="guitarContainer" style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#a36233',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div className="headstockContainer" style={{
                height: '100%',
                width: '5%',
                // backgroundColor: 'brown',
                display: 'flex',
                zIndex: 2,
            }}>
                <HeadStock/>
            </div>
            <div className="neckContainer" style={{
                height: '100%',
                width: '95%',
                // backgroundColor: 'blue',
                display: 'flex',
                zIndex: 1,
            }}>
                <Neck/>
            </div>
        </div>
    );
};

export default Guitar;
