const Decimal = require('decimal.js');

const num = '100.1994025491059419582528804';
const numDecimal = new Decimal(num);

console.log('ROUND_UP        :', numDecimal.toFixed(2, Decimal.ROUND_UP));
console.log('ROUND_DOWN      :', numDecimal.toFixed(2, Decimal.ROUND_DOWN));
console.log('ROUND_CEIL      :', numDecimal.toFixed(2, Decimal.ROUND_CEIL));
console.log('ROUND_FLOOR     :', numDecimal.toFixed(2, Decimal.ROUND_FLOOR));
console.log('ROUND_HALF_UP   :', numDecimal.toFixed(2, Decimal.ROUND_HALF_UP));
console.log('ROUND_HALF_DOWN :', numDecimal.toFixed(2, Decimal.ROUND_HALF_DOWN));
console.log('ROUND_HALF_CEIL :', numDecimal.toFixed(2, Decimal.ROUND_HALF_CEIL));
console.log('ROUND_HALF_FLOOR:', numDecimal.toFixed(2, Decimal.ROUND_HALF_FLOOR));
console.log('EXCLID          :', numDecimal.toFixed(2, Decimal.EXCLID));

// round_floor(9.46896, .01) 👉 -9.46
// round_down(9.46896, .01)  👉 -9

// round_ceiling(9.46896, .01) 👉 -9.47
// round_up(9.46896, .01)      👉 -10
