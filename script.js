let audioContext = {};

document.addEventListener('keydown', (e) => {
    const audio = new AudioContext();
    audioContext = audio;
})

const NOTE_DETAILS = [
    { note: "C", key: "Z", frequency: 261.626 },
    { note: "Db", key: "S", frequency: 277.183 },
    { note: "D", key: "X", frequency: 293.665 },
    { note: "Eb", key: "D", frequency: 311.127 },
    { note: "E", key: "C", frequency: 329.628 },
    { note: "F", key: "V", frequency: 349.228 },
    { note: "Gb", key: "G", frequency: 369.994 },
    { note: "G", key: "B", frequency: 391.995 },
    { note: "Ab", key: "H", frequency: 415.305 },
    { note: "A", key: "N", frequency: 440 },
    { note: "Bb", key: "J", frequency: 466.164 },
    { note: "B", key: "M", frequency: 493.883 }

]

// returns the key note object pressed by finding in the NOTE_DETAILS array
const getNoteDetails = (keyboardKey) => {
    return NOTE_DETAILS.find(n => `Key${n.key}` === keyboardKey);
}


const startNote = (noteDetail) =>{
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = noteDetail.frequency;
    oscillator.type = "sine";
    oscillator.connect(audioContext.destination);
    oscillator.start();
    noteDetail.oscillator = oscillator;
}


const playNote = () => {

    // toggles the active class to the key element pressed / released
    NOTE_DETAILS.forEach(n => {
        const keyElement = document.querySelector(`[data-note="${n.note}"]`);
        keyElement.classList.toggle("active", n.active || false);
        if(n.oscillator != null)
        {
            n.oscillator.stop();
            n.oscillator.disconnect();
        }
    });

    const activeNotes = NOTE_DETAILS.filter(n => n.active);
    activeNotes.forEach(n => {
        startNote(n);

    })
}



document.addEventListener('keydown', e => {
    if (e.repeat) return   // avoids running code if user held down continuously so our code runs once
    const keyboardKey = e.code;
    const noteDetail = getNoteDetails(keyboardKey);
    if (noteDetail == null) return

    noteDetail.active = true;
    playNote(noteDetail);
});

document.addEventListener('keyup', e => {
    const keyboardKey = e.code;
    const noteDetail = getNoteDetails(keyboardKey);
    if (noteDetail == null) return

    noteDetail.active = false;
    playNote(noteDetail);

});
