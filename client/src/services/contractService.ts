import { JsonRpcProvider, Contract, parseEther } from "ethers";
// import ContractABI from "../abi/MatatuGame.json"; // Commenting out as we'll mock this for now

// Mock contract functions (for now, no blockchain logic)
const mockJoinGame = async (playerAddress: string) => {
  // Simulating a successful transaction
  return {
    hash: "mockTransactionHash",
    status: "success",
  };
};

// Commenting out the real contract initialization and calling logic
// const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "";
// const RPC_URL = process.env.REACT_APP_SEPOLIA_RPC_URL || "";

// const provider = new JsonRpcProvider(RPC_URL);

// Wrap in a function to avoid top-level await
// const getSigner = async () => {
//   return await provider.getSigner();
// };

// const initContract = async () => {
//   const signer = await getSigner();
//   return new Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
// };

// Replace contract call with mock for now
export const joinGame = async (playerAddress: string) => {
  try {
    // Mocking the contract join game logic
    const tx = await mockJoinGame(playerAddress);
    console.log("Transaction Hash:", tx.hash);
    return tx;
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
};
