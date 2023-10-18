export default function asyncWait(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
