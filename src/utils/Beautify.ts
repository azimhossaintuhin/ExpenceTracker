export const beautifyKey = (key:string) => {
    return key
      .replace(/_/g, " ")  
      .replace(/\b\w/g, (char:string) => char.toUpperCase()); // Capitalize each word
  };