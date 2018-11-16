export function consoleError(...stuff) {
  if ('error' in console) {
    console.error(...stuff)
  } else {
    console.log('ERROR:', ...stuff)
  }
}
