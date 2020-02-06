export const normallizeTime = function (seconds) {
  const mins = `${Math.floor(seconds / 60)}`
  const secs = `${seconds % 60}`
  return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
}
