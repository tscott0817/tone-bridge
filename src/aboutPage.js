// components/About.js
import React from 'react';

const AboutPage = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            overflow: 'none'
        }}>
            <div style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                //justifyContent: 'center',
                color: '#333',
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                overflow: 'auto'
            }}>
                <h1 style={{marginBottom: '0px'}}>About Tone Bridge and the Dev</h1>
                <p style={{maxWidth: '800px', textAlign: 'left', marginBottom: '40px'}}>
                    This app is designed to help guitarists explore scales, chords, and alternate tunings.
                    As a programmer and guitar player I am always looking for new ways to improve both my theory and
                    fretboard knowledge, as well as learning new web technologies. There are many fretboard diagram websites
                    that already exist, but I find them lacking in functionality that I would personally find useful.
                    The main one of these being the ability to alter each string independently. Many of the current
                    offerings only include a collection of pre-set tunings, scales, and chords. What Tone Bridge attempts to
                    do is
                    bridge (hehe) this gap in information and give the user complete control over any possible combination
                    of tunings and their shifting note positions, mapped to any scale or chord.
                </p>

                <h1 style={{marginBottom: '0px'}}>Features</h1>
                <p style={{maxWidth: '800px', textAlign: 'left', marginBottom: '40px'}}>
                    - Freely adjustable tuning.<br/>
                    - Octave ranges from 0 - 8.<br/>
                    - Scale Degree color highlighting.<br/>
                    - Automatic chord detection based on the collection of current notes.<br/>
                    - Audibly play the current note selections via Tone.js library.<br/>


                </p>

                <h1 style={{marginBottom: '0px'}}>How to Use</h1>
                <p style={{maxWidth: '800px', textAlign: 'left', marginBottom: '40px'}}>
                    To get started simply select some notes on the fretboard diagram or use the menu (cog wheel) to
                    choose from a selection of included scales and chords.

                </p>

                <h1 style={{marginBottom: '0px'}}>User Profile</h1>
                <p style={{maxWidth: '800px', textAlign: 'left', marginBottom: '40px'}}>
                    - Open the settings menu and choose 'User Profile'.<br/>
                    - Create a profile with your email and password.<br/>
                    - Now just save any tuning or note collection to your profile, give it a name, and access it at any
                    future
                    time.<br/>

                </p>

                {/*<div style={{maxWidth: '800px', textAlign: 'center', marginBottom: '20px'}}>*/}
                {/*    <div style={{marginBottom: '10px'}}>Open the settings menu and choose 'User Profile'.</div>*/}
                {/*    <div style={{marginBottom: '10px'}}>Create a profile with your email and password.</div>*/}
                {/*    <div>Now just save any tuning or note collection to your profile, give it a name, and access it at any*/}
                {/*        future time.*/}
                {/*    </div>*/}
                {/*</div>*/}

                <h1 style={{marginBottom: '0px'}}>What's Next</h1>
                <p style={{maxWidth: '800px', textAlign: 'left', marginBottom: '40px'}}>
                    Implementation of more instruments to allow all musicians to explore these ideas on their instrument of
                    choice.
                </p>
                {/*<h1 style={{marginBottom: '0px'}}>About The Dev</h1>*/}
                {/*<p style={{maxWidth: '800px', textAlign: 'center', marginBottom: '40px'}}>*/}

                {/*</p>*/}
            </div>
        </div>
    );
}

export default AboutPage;
