export function consoleError(message) {
  if ('error' in console) {
    console.error(message)
  } else {
    console.log('ERROR:', message)
  }
}
