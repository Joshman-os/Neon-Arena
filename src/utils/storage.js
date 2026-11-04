
export const loadNumber = (key) => {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
};

export const saveNumber = (key, value) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    
  }
};
