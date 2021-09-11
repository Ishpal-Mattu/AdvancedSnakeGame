// The Sound class is inspired by thw w3School website : https://www.w3schools.com/graphics/game_sound.asp
class Sound{
    constructor(soundSrc, isLoop, volume){
        this.sound = document.createElement("audio");

        this.CompleteSoundElement(soundSrc, isLoop, volume);
        this.AppendSoundElement();
    }
    CompleteSoundElement(soundSrc, isLoop, volume){
        this.sound.src = soundSrc;
        this.sound.loop = isLoop;
        this.sound.volume = volume;
        this.sound.style.display = "none";
    }
    AppendSoundElement(){
        let header = document.getElementsByTagName('header')[0];

        header.appendChild(this.sound);
    }
    PlaySound(){
        this.sound.play();
    }
    StopSound(){
        this.sound.pause();
    }

}
