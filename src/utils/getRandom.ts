const MAX_ID = 100;

export const getRandomCharacter: (notThisOne?: number) => number = (
  notThisOne
) => {
  const characterNumber = Math.floor(Math.random() * MAX_ID) + 1;

  if (characterNumber !== notThisOne) return characterNumber;
  return getRandomCharacter(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomCharacter();
  const secondId = getRandomCharacter(firstId);
  return [firstId, secondId];
};