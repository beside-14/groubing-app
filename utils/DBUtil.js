import axios from "axios";

export  const getBingoList = async (bingoList) => {
    const response = await axios.post("api url", bingoList);
    return response.data;
}