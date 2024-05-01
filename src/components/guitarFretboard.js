import React, { useRef, useEffect } from 'react';

const GuitarFretboard = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Define constants
        const stringCount = 6; // number of strings on guitar
        const fretCount = 12; // number of frets on guitar
        const fretWidth = 40; // width of each fret
        const fretHeight = 20; // height of each fret
        const openStringSectionWidth = 80; // width of the open string section
        const neckWidth = canvas.width - openStringSectionWidth; // width of the neck background
        const neckHeight = canvas.height - fretHeight; // height of the neck background
        const neckX = openStringSectionWidth; // x position of the neck background
        const neckY = fretHeight * 0.5; // y position of the neck background
        const fretSpacing = neckWidth / fretCount; // horizontal spacing between frets
        const topStringOffset = stringCount * fretHeight * 0.1; // offset for the top string
        const bottomStringOffset = stringCount * fretHeight * 0.1; // offset for the bottom string
        const totalStringHeight = neckHeight - topStringOffset - bottomStringOffset;
        const stringSpacing = totalStringHeight / (stringCount - 1); // vertical spacing between strings
        const squareSize = 20; // size of the colored squares

        // Function to draw colored squares representing clickable sections
        const drawClickableSections = () => {
            ctx.fillStyle = 'red'; // Change color as needed
            for (let fret = 1; fret <= fretCount; fret++) {
                for (let string = 1; string <= stringCount; string++) {
                    const squareX = neckX + (fret * fretSpacing) - (fretSpacing / 2) - (squareSize / 2);
                    const squareY = neckY + (string - 1) * stringSpacing + topStringOffset - (squareSize / 2);
                    ctx.fillRect(squareX, squareY, squareSize, squareSize);
                }
            }
        };

        // Function to draw fret markers
        const drawFretMarkers = () => {
            const fretMarkers = [3, 5, 7, 9, 12]; // frets with markers
            const markerRadius = 10; // radius of fret markers
            const markerOffsetY = fretHeight / 2 - (fretHeight - stringSpacing) / 2 - topStringOffset; // y offset for centering marker
            ctx.fillStyle = 'white';
            fretMarkers.forEach(fret => {
                const markerX = neckX + (fret * fretSpacing) - (fretSpacing / 2);
                const markerY = neckY + 3 * stringSpacing - markerOffsetY;
                ctx.beginPath();
                ctx.arc(markerX, markerY, markerRadius, 0, 2 * Math.PI);
                ctx.fill();
            });
        };

        // Function to handle mouse click event
        // Function to handle mouse click event
        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Check if the click is within the bounds of any clickable section
            for (let fret = 1; fret <= fretCount; fret++) {
                for (let string = 1; string <= stringCount; string++) {
                    const squareX = neckX + (fret * fretSpacing) - (fretSpacing / 2) - (squareSize / 2);
                    const squareY = neckY + (string - 1) * stringSpacing + topStringOffset - (squareSize / 2);
                    if (x >= squareX && x <= squareX + squareSize && y >= squareY && y <= squareY + squareSize) {
                        // Draw the note name in a circle
                        const markerX = neckX + (fret * fretSpacing) - (fretSpacing / 2);
                        const markerY = neckY + (string - 1) * stringSpacing + topStringOffset;
                        const markerRadius = 10;
                        ctx.fillStyle = 'white';
                        ctx.beginPath();
                        ctx.arc(markerX, markerY, markerRadius, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.fillStyle = 'black';
                        ctx.font = '14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('C', markerX, markerY); // Change note name as needed
                        return; // Exit the function after finding the matching clickable section
                    }
                }
            }
        };


        // Set canvas dimensions
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Draw black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw neck background
        ctx.fillStyle = '#483D8B'; // dark slate blue
        ctx.fillRect(neckX, neckY, neckWidth, neckHeight);

        // Draw open string section
        ctx.fillStyle = '#3CB371'; // medium sea green
        ctx.fillRect(0, neckY, openStringSectionWidth, neckHeight);

        // Draw frets
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        for (let i = 1; i < fretCount; i++) {
            ctx.beginPath();
            ctx.moveTo(neckX + i * fretSpacing, neckY);
            ctx.lineTo(neckX + i * fretSpacing, neckY + neckHeight);
            ctx.stroke();
        }

        // Draw strings
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        for (let i = 0; i < stringCount; i++) {
            const stringY = neckY + topStringOffset + i * stringSpacing;
            ctx.beginPath();
            ctx.moveTo(neckX, stringY);
            ctx.lineTo(neckX + neckWidth, stringY);
            ctx.stroke();
        }

        // Draw fret markers
        drawFretMarkers();

        // Draw clickable sections
        drawClickableSections();

        // Add click event listener to the canvas
        canvas.addEventListener('click', handleClick);

        // Clean up event listener on unmount
        return () => {
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default GuitarFretboard;
