export const narrateText = async (message: string) => {
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        window.speechSynthesis.cancel();
        resolve(true);
      }, 10000);
      const speech = new SpeechSynthesisUtterance(message);
      speech.addEventListener("end", () => {
        clearTimeout(timeout);
        resolve(true);
      });
  
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    });
  };

  export const getRandomInteger = (max: number) => Math.floor(Math.random() * max);