import { JsonRpcProvider, Contract, parseEther } from "ethers";
import ContractABI from "../abi/MatatuGame.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "";
const RPC_URL = process.env.REACT_APP_SEPOLIA_RPC_URL || "";

const provider = new JsonRpcProvider(RPC_URL);

// Wrap in a function to avoid top-level await
const getSigner = async () => {
  return await provider.getSigner();
};

const initContract = async () => {
  const signer = await getSigner();
  return new Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
};

export const joinGame = async (playerAddress: string) => {
  try {
    const contract = await initContract(); // Initialize contract with signer
    const tx = await contract.joinGame(playerAddress, {
      value: parseEther("0.01"),
    });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
};
