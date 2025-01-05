import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const createMatch = async (playerAddress: string) => {
  try {
    const response = await axios.post(`${API_URL}/match`, { playerAddress });
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

export const getMatchStatus = async (matchId: string) => {
  try {
    const response = await axios.get(`${API_URL}/match/${matchId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match status:", error);
    throw error;
  }
};
