export const convertToCamelCase = (obj: any): any => {
  const camelCaseObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      camelCaseKey = camelCaseKey
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
          if (index === 0) {
            return match.toLowerCase();
          } else {
            return match.toUpperCase();
          }
        })
        .replace(/\s+/g, '');
      camelCaseObj[camelCaseKey] = obj[key];
    }
  }
  return camelCaseObj;
};

const isCamelCase = (str: string): boolean => {
  return /^[a-z]+(?:[A-Z][a-z]+)*$/.test(str);
};
