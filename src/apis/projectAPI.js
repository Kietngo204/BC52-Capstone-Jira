import fetcher from "./fetcher";

export const getProject = async () => {
  try {
    const response = await fetcher.get("/Project/getAllProject");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getProjectDetail = async (projectId) => {
  try {
    const response = await fetcher.get("/Project/getProjectDetail", {
      params: { id: projectId },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getProjectCategogy = async () => {
  try {
    const response = await fetcher.get("/ProjectCategory");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateProject = async (payload) => {
  try {
    const response = await fetcher.put("/Project/updateProject", payload, {
      params: { projectId: payload.id },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const createProject = async (payload) => {
  console.log(payload);
  try {
    const response = await fetcher.post(
      "/Project/createProjectAuthorize",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetcher.delete("/Project/deleteProject", {
      params: { projectId: projectId },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
