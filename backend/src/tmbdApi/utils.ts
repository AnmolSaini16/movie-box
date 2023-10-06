const baseUrl = process.env.TMBD_BASE_URL;

export const getUrl = (url: string, params: { [key: string]: string }) => {
  const queryParams = new URLSearchParams(params);

  return `${baseUrl}${url}?&${queryParams}`;
};
