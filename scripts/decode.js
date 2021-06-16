const { ethers } = require('ethers');

const decoded = ethers.utils.defaultAbiCoder.decode(
  [ 'address', 'address', 'bytes', 'uint256' ],
  ethers.utils.hexDataSlice(
    '0xcbd4ece9000000000000000000000000a8939f91612c7286ae0e807e4f5845a990b5916c000000000000000000000000ffe6c451d5406e55c28be4ae10e8245f82b88e9a0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000001b00000000000000000000000000000000000000000000000000000000000000448d6e9a5b0000000000000000000000005941dd2b2d08f8f7d85ddd8a69e46ef9559e900a000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000',
    4
  ),
);

console.log(decoded);
// [
//   '0xa8939F91612c7286ae0e807e4F5845a990B5916C',
//   '0xFfE6C451d5406e55C28bE4ae10E8245F82b88E9a',
//   '0x8d6e9a5b0000000000000000000000005941dd2b2d08f8f7d85ddd8a69e46ef9559e900a0000000000000000000000000000000000000000000000000000000000000064',
//   BigNumber { _hex: '0x1b', _isBigNumber: true }
// ]
