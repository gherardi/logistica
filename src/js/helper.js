export const calculateSum = (array) => array.reduce((acc, value) => acc + value, 0);

export const generateArray = (length, minRandom, maxRandom) =>
	Array.from({ length }, () => getRandomNumber(minRandom, maxRandom));

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const wait = function(s){
	return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}