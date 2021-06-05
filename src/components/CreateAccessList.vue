<template>
  <div>
    <button @click="connectMetaMask()">
      {{ address ? address : "connect" }}
    </button>
    <br />
    <button @click="estimateGas()">
      {{ estimatedGas ? estimatedGas : "estimateGas" }}
    </button>
    <button @click="createAccessList()">
      {{ gasUsed ? gasUsed : "createAccessList" }}
    </button>
  </div>
</template>

<script>
import { ethers } from "ethers";
const BigNumber = ethers.BigNumber;

export default {
  data() {
    return {
      contract: null,
      signer: "",
      address: "",
      balance: "",

      estimatedGas: "",
      gasUsed: "",
    };
  },
  methods: {
    async connectMetaMask() {
      // https://docs.metamask.io/guide/getting-started.html#basic-considerations
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const web3Provider = new ethers.providers.Web3Provider(
            window.ethereum
          ); // https://docs.ethers.io/v5/api/providers/other/#Web3Provider
          const signer = web3Provider.getSigner(); // https://docs.ethers.io/v5/api/signer/
          this.signer = signer;

          const contractAddress = "0x2be5e8c109e2197D077D13A82dAead6a9b3433C5"; // https://rinkeby.etherscan.io/token/0x44d4f5d89e9296337b8c48a332b3b2fb2c190cd0
          const contractAbi = [
            "function approve(address, uint256) returns (bool)",
          ];
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          this.contract = contract;

          const [address, balance] = await Promise.all([
            signer.getAddress(),
            signer.getBalance(),
          ]);
          this.address = address;
          this.balance = balance;
        } catch (e) {
          // Need to handle reject connecting wallet.
        }
      } else {
        // MetaMask needs to be installed.
      }
    },
    async estimateGas() {
      const allowance = BigNumber.from("1000");
      this.estimatedGas = await this.contract.estimateGas.approve(
        "0x2be5e8c109e2197D077D13A82dAead6a9b3433C5",
        allowance
      );
    },
    async createAccessList() {
      console.log(this.signer.provider);
    },
  },
};
</script>

<style scoped>
button {
  margin: 40px 0px;
}
</style>
