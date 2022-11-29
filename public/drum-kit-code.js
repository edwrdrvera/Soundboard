const context = new AudioContext();
const createDrumKit = () =>{
    const drums = [ 
    {
        buttonTitle: "Kick [A]",
        audioFile:"kick.wav",
        key:"a"
    },
    {
        buttonTitle: "Snare [S]",
        audioFile: "snare.wav",
        key: "s"
      },
      {
        buttonTitle: "Hi-hat [D]",
        audioFile: "hi-hat.wav",
        key: "d"
      },
      {
        buttonTitle: "Snap [Z]",
        audioFile: "snap.wav",
        key: "z"
      },
      {
        buttonTitle: "Clap [X]",
        audioFile: "clap.wav",
        key: "x"
      },
      {
        buttonTitle: "Meep [C]",
        audioFile: "meep.wav",
        key: "c"
      },
      {
        buttonTitle: "R&B Guitar [G]",
        audioFile: "rnb-loop.wav",
        key: "g"
      },
      {
        buttonTitle: "Synth [H]",
        audioFile: "synth-loop.wav",
        key: "h"
      },
      {
        buttonTitle: "Hip-hop [J]",
        audioFile: "hip-hop.wav",
        key: "j"
      }
] 

const playAudioFile = (buffer, button) => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
    button.classList.add("playing");
    setTimeout(() => {
        button.classList.remove("playing");
    }, 300)

    
}

const createButtons = async () => {
    for(let drum of drums){
        const button = document.createElement("button");
        const textNode = document.createTextNode(drum.buttonTitle);
        button.appendChild(textNode);

        drum.audioBuffer = await fetch(drum.audioFile)
        .then(result => result.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer));

        button.addEventListener("click", () => {
            playAudioFile(drum.audioBuffer, button)
        });

        document.addEventListener("keydown", (event) => {
            if(event.key.toLowerCase() === drum.key){
                playAudioFile(drum.audioBuffer, button)
            }
        });
        console.log(drum.audioBuffer);
        document.querySelector(".drums").appendChild(button);
    }
};
createButtons();
}

const setup = () => {
    if(document.readyState !== "loading"){
        createDrumKit();
    }
   else{
    document.addEventListener("DOMContentLoaded", function () {
    createDrumKit();
      });
    }
};
setup();