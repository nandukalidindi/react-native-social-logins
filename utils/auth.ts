export const objectToQueryString = (object: any, delimiter = ','): string => {
  return Object.keys(object).map(key => `${key}=${object[key]}`).join(delimiter);
};

export const queryStringToObject = (queryString: string, separator = '&'): any => {
  return queryString.split(separator).reduce((acc, param) => {
    const [key, value] = param.split('=');

    acc[key] = value;
    return acc;
  }, {} as any);
}