function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
checkStringLength('тест', 5);

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }
  return normalizedStr === reversedStr;
}

isPalindrome('тест');

function extractDigits(input) {
  const str = input.toString();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
}

extractDigits('кот');
