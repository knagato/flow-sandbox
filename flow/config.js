import { config } from "@onflow/fcl";

config({
  // "accessNode.api": "http://localhost:8080",
  // "discovery.wallet": "http://localhost:8701/fcl/authn",
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "0xNFTDiary": "0x5e78e3e6351ae6c1" // The account address where the smart contract lives
})