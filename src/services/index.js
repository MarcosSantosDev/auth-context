import clientHttp from './clientHttp';

export const ping = async () => {
  try {
    const clientApi = clientHttp();

    const response = await clientApi.get('ping');

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error)
  }
}
