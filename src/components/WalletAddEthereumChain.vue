<template>
  <div>
    <button @click="addEthereumChain">add ethereum chain</button>
  </div>
</template>

<script>
export default {
  methods: {
    async addEthereumChain() {
      // https://eips.ethereum.org/EIPS/eip-3085#wallet_addethereumchain
      // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
      const provider = window.ethereum;
      const data = [
        {
          chainId: "0x1c",
          chainName: "Tokamak Network",
          // NOTE: there is no native token in optimism.
          // nativeCurrency: {
          //   name: 'Tokamak Network Token',
          //   symbol: 'TON',
          //   decimals: 18,
          // },
          rpcUrls: ["https://rinkeby.omgx.network"], // TODO: open https://rinkeby.tokamak.network on layer 2
          // blockExplorerUrls: [''], // TODO: open tokamak network block explorer site
        },
      ];
      /* eslint-disable */
      try {
        provider.request({ method: "wallet_addEthereumChain", params: data });
      } catch (err) {
        console.log("error", err.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
