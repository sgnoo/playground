<template>
  <div>
    <button @click="connectMetaMask()">
      {{ address ? address : "connect" }}
    </button>
    <div>balance (ETH): {{ balance ? balance : "-" }}</div>
    <div>balance (TON): {{ balance ? tokenBalance : "-" }}</div>
    <div>
      totalSupply (TON): {{ tokenTotalSupply ? tokenTotalSupply : "-" }}
    </div>
    <button @click="approve()">approve</button>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      address: "",
      contract: null,

      balance: "",
      tokenBalance: "",
      tokenTotalSupply: "",
    };
  },
  async created() {
    await this.connectProvider();
  },
  methods: {
    async connectProvider() {
      // https://docs.ethers.io/v5/api/providers/api-providers/#InfuraProvider
      const provider = new ethers.providers.InfuraProvider("rinkeby", {
        projectId: "27113ffbad864e8ba47c7d993a738a10",
      });

      const contractAddress = "0x44d4f5d89e9296337b8c48a332b3b2fb2c190cd0"; // https://rinkeby.etherscan.io/token/0x44d4f5d89e9296337b8c48a332b3b2fb2c190cd0
      const contractAbi = [
        "function approve(address, uint256) returns (bool)",

        // view functions
        "function balanceOf(address) view returns (uint256)",
        "function totalSupply() view returns (uint256)",
      ];
      const tonContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      const totalSupply = await tonContract.totalSupply();

      this.contract = tonContract;
      this.tokenTotalSupply = totalSupply;
    },
    async connectMetaMask() {
      // https://docs.metamask.io/guide/getting-started.html#basic-considerations
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const web3Provider = new ethers.providers.Web3Provider(
            window.ethereum
          ); // https://docs.ethers.io/v5/api/providers/other/#Web3Provider
          const signer = web3Provider.getSigner(); // https://docs.ethers.io/v5/api/signer/

          const [address, balance] = await Promise.all([
            signer.getAddress(),
            signer.getBalance(),
          ]);
          this.address = address;
          this.balance = balance;

          // const tokenBalance = await this.contract.balanceOf(address)
          const tokenBalance = await this.contract.balanceOf(
            "0x660de9ae5dd7c8de4c5c9a8dab64af706a9f8a57"
          );
          this.tokenBalance = tokenBalance;

          this.contract = this.contract.connect(signer); // https://docs.ethers.io/v5/api/contract/contract/#Contract-connect

          // https://docs.metamask.io/guide/ethereum-provider.html#events
          const handleAccountsChanged = (accounts) => {
            console.log(accounts);
          };
          const handleChainChanged = (chainId) => {
            console.log(chainId);
          };
          window.ethereum.on("accountsChanged", handleAccountsChanged);
          window.ethereum.on("chainChanged", handleChainChanged);
        } catch (e) {
          // Need to handle reject connecting wallet.
        }
      } else {
        // MetaMask needs to be installed.
      }
    },
    async approve() {
      if (!this.address) {
        return alert("please connect wallet!");
      }
      const tx = await this.contract.approve(
        "0x660de9ae5dd7c8de4c5c9a8dab64af706a9f8a57",
        0
      ); // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
      const receipt = await tx.wait();

      if (receipt.status) {
        // The status of a transaction is 1 is successful or 0 if it was reverted.
        console.log(receipt);
        alert("success");
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 40px 0px;
}
</style>
