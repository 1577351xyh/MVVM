import { assert } from './common.js'

const keyword = {
  'new': true,
  'class': true,
  'for': true,
}
/**
 * 1.表达式求解,核心方法
 * @param {*} str 
 * @param {*} data 
 */
export function expr(str, data) {
  function parseGlobal(s, localExpr) {
    //关键字,全局方法
    if ((s in window) || keyword[s] && !data[s]) {
      return s;
    } else {
      return localExpr;
    }
  }

  let arr = parseExpr(str);

  let arr2 = arr.map(item => {
    if (typeof item == 'string') return "'" + item + "'";
    else {
      let str = item.expr.replace(/.?[\$_a-z][a-z0-9_\$]*/ig, function (s) {
        if (/[\$_a-z]/i.test(s[0])) {
          return parseGlobal(s, 'data.' + s);
        } else {
          if (s[0] == '.') {
            return s;
          } else {
            return s[0] + parseGlobal(s.substring(1), 'data.' + s.substring(1));
          }
        }
      });

      return str;
    }
  });

  let str2 = arr2.join('');

  return eval(str2);
}



/**
 * 解析字符串和表达式
 */
function parseExpr(str) {
  let arr = [];

  while (1) {
    let n = str.search(/'|"/);
    if (n == -1) {
      arr.push({ expr: str });
      break;
    }

    let m = n + 1;
    while (1) {
      m = str.indexOf(str[n], m);
      if (m == -1) {
        throw new Error('引号没配对');
      }

      if (str[m - 1] == '\\') {
        m++;
        continue;
      } else {
        break;
      }
    }

    arr.push({ expr: str.substring(0, n) });
    arr.push(str.substring(n + 1, m));
    str = str.substring(m + 1);
  }

  return arr;
}