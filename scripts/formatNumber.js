const Decimal = require('decimal.js');
const { ethers } = require('ethers');
const utils = ethers.utils

const n1 = (i) => '1234.' + '9'.repeat(i)
const n2 = (i) => '1234' + '9'.repeat(i)

console.log('*'.repeat(100))

const weiAmount1 = n1(18) 
const rayAmount1 = n1(27)

console.log(weiAmount1) // 1234.999999999999999999
console.log(rayAmount1) // 1234.999999999999999999999999999

// https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseUnits
const weiAmountBN1 = utils.parseUnits(weiAmount1, 18)
const rayAmountBN1 = utils.parseUnits(rayAmount1, 27)
console.log(weiAmountBN1.toString()) // 1234999999999999999999
console.log(rayAmountBN1.toString()) // 1234999999999999999999999999999

console.log('*'.repeat(100))

const weiAmount2 = n2(18) 
const rayAmount2 = n2(27)
console.log(weiAmount2) // 1234999999999999999999
console.log(rayAmount2) // 1234999999999999999999999999999

// https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatUnits
const weiAmountBN2 = utils.formatUnits(weiAmount2, 18)
const rayAmountBN2 = utils.formatUnits(rayAmount2, 27)
console.log(weiAmountBN2.toString()) // 1234.999999999999999999
console.log(rayAmountBN2.toString()) // 1234.999999999999999999999999999

console.log('*'.repeat(100))
// https://docs.ethers.io/v5/api/utils/display-logic/#utils-commify
console.log(utils.commify(weiAmount1))
console.log(utils.commify(weiAmount2), '<- we don\'t have to use this.')
console.log(utils.commify(rayAmount1))
console.log(utils.commify(rayAmount2), '<- we don\'t have to use this.')

function truncate(str, maxDecimalDigits) {
  if (str.includes('.')) {
    const parts = str.split('.'); // [ '1,234', '999999999999999999999999999' ]
    if (maxDecimalDigits === 0) {
      return parts[0]
    }

    const l = maxDecimalDigits - parts[1].length > 0 ? maxDecimalDigits - parts[1].length : 0
    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits) + '0'.repeat(l)
  }
  return str
}

console.log('*'.repeat(100))

console.log(truncate(utils.commify(weiAmount1), 2))
console.log(truncate(utils.commify(weiAmount2), 2), '<- we don\'t have to use this.')
console.log(truncate(utils.commify(rayAmount1), 2))
console.log(truncate(utils.commify(rayAmount2), 2), '<- we don\'t have to use this.')

console.log('*'.repeat(100))

// https://mikemcl.github.io/decimal.js/#toFixed
function round(str, maxDecimalDigits) {
  const num = new Decimal(str)
  return num.toFixed(maxDecimalDigits, Decimal.ROUND_CEIL)
}

console.log('*'.repeat(100))
console.log(round(weiAmount1, 2)) // 1235.00
console.log(round(rayAmount1, 2)) // 1235.00
console.log(round(weiAmount2, 2)) // 1234999999999999999999.00
console.log(round(rayAmount2, 2)) // 1234999999999999999999999999999.00

console.log('*'.repeat(100))
console.log(utils.commify(round(weiAmount1, 2))) // 1,235.0 <- decimal place is 1
console.log(utils.commify(round(rayAmount1, 2))) // 1,235.0 <- decimal place is 1
console.log(utils.commify(round(weiAmount2, 2))) // 1,234,999,999,999,999,999,999.0 <- decimal place is 1
console.log(utils.commify(round(rayAmount2, 2))) // 1,234,999,999,999,999,999,999,999,999,999.0 <- decimal place is 1

console.log('*'.repeat(100))
console.log(truncate(utils.commify(round(weiAmount1, 2)), 2)) // 1,235.00 <- decimal place is 2
console.log(truncate(utils.commify(round(rayAmount1, 2)), 2)) // 1,235.00 <- decimal place is 2
console.log(truncate(utils.commify(round(weiAmount2, 2)), 2)) // 1,234,999,999,999,999,999,999.00 <- decimal place is 2
console.log(truncate(utils.commify(round(rayAmount2, 2)), 2)) // 1,234,999,999,999,999,999,999,999,999,999.00 <- decimal place is 2
