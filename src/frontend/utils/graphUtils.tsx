export function getDifferentColorMap<T>(dataMap: T[]): string[] {
  return dataMap.map((_, i) => {
    const r = 100 + (i * 20) % 155;
    const g = 150 + (i * 40) % 105;
    const b = 200 + (i * 60) % 55;
    return `rgba(${r},${g},${b},0.5)`;
  });
}
