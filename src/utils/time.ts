export default function delay(time: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < time) {}
}
