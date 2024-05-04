import React, { useRef, useEffect } from 'react';
import { useNoteContext } from "../stateManager/NoteContext";
import {Note} from "tonal";

const GuitarFretboard = () => {
    const canvasRef = useRef(null);
    const { selectedNotes } = useNoteContext();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Define constants
        const stringCount = 6; // number of strings on guitar
        const fretCount = 12; // number of frets on guitar
        const clickableSectionCount = 13; // number of clickable sections
        const fretWidth = 40; // width of each fret
        const fretHeight = 20; // height of each fret
        const openStringSectionWidth = canvas.width * .05; // width of the open string section
        const neckWidth = canvas.width - openStringSectionWidth; // width of the neck background
        const neckHeight = canvas.height - fretHeight; // height of the neck background
        const neckX = openStringSectionWidth; // x position of the neck background
        const neckY = fretHeight * 0.5; // y position of the neck background
        const fretSpacing = neckWidth / fretCount; // horizontal spacing between frets
        const topStringOffset = stringCount * fretHeight * 0.25; // offset for the top string
        const bottomStringOffset = stringCount * fretHeight * 0.25; // offset for the bottom string
        const totalStringHeight = neckHeight - topStringOffset - bottomStringOffset;
        const stringSpacing = totalStringHeight / (stringCount - 1); // vertical spacing between strings
        // const squareSize = canvas.width * 0.05; // size of the colored squares
        const squareSize = Math.min(canvas.width * 0.05, 50);

        // Function to draw colored squares representing clickable sections
        const drawClickableSections = () => {
            ctx.fillStyle = 'rgba(200, 0, 0, 0.5)'; // Change color as needed
            for (let fret = 1; fret <= clickableSectionCount + 1; fret++) {
                // Calculate the x position with an offset for the first column
                const offsetX = fret === 1 ? openStringSectionWidth * 0.25 : 0;
                for (let string = 1; string <= stringCount; string++) {
                    const squareX = neckX + (fret * fretSpacing) - (fretSpacing * 1.5) - (squareSize / 2) + offsetX;
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

        const calculateNote = (fret, string) => {

            const stringNotes = [
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(64 + i))),  // E4 to E5
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(59 + i))), // B3 to B4
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(55 + i))), // G3 to G4
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(50 + i))), // D3 to D4
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(45 + i))), // A2 to A3
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(40 + i))), // E2 to E3
            ];

            // Get the note for the given fret and string
            const noteIndex = (fret - 1) % stringNotes[string - 1].length;
            const noteName = stringNotes[string - 1][noteIndex];

            return `${noteName}`;
        };


        // Function to handle mouse click event
        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Check if the click is within the bounds of any clickable section
            for (let fret = 1; fret <= clickableSectionCount; fret++) {
                const offsetX = fret === 1 ? openStringSectionWidth * 0.275 : 0;

                for (let string = 1; string <= stringCount; string++) {
                    const squareX = neckX + (fret * fretSpacing) - (fretSpacing * 1.5) - (squareSize / 2) + offsetX;
                    // const squareX = neckX + (fret * fretSpacing) - (fretSpacing * 1.5) - (squareSize / 2) + offsetX;
                    const squareY = neckY + (string - 1) * stringSpacing + topStringOffset - (squareSize / 2);
                    if (x >= squareX && x <= squareX + squareSize && y >= squareY && y <= squareY + squareSize) {
                        // Draw the note name with octave number
                        const markerX = squareX + (squareSize / 2); // Corrected calculation
                        const markerY = neckY + (string - 1) * stringSpacing + topStringOffset;
                        const markerRadius = squareSize * 0.5;
                        // ctx.fillStyle = 'white';
                        ctx.fillStyle = 'rgba(255, 150, 150, 0.75)';
                        ctx.beginPath();
                        ctx.arc(markerX, markerY, markerRadius, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.fillStyle = 'black';
                        ctx.font = '14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        const note = calculateNote(fret, string); // Calculate note name with octave
                        ctx.fillText(note, markerX, markerY); // Display note name with octave
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
        // drawClickableSections();

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
