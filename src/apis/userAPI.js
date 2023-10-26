import fetcher from "./fetcher";

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/Users/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.message;
  }
};

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/Users/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.message;
  }
};

export const getUser = async (username) => {
  try {
    const response = await fetcher.get("/Users/getUser", {
      params: {
        keyword: username,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
