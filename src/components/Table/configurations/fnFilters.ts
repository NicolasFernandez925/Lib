export const sortByProperty = <T, K extends keyof T>(
  data: T[],
  property: K
) => {
  const sortedData = [...data].sort((a, b) => {
    const valueA = (a[property] as string).toLowerCase();
    const valueB = (b[property] as string).toLowerCase();

    if (valueA < valueB) {
      return -1;
    } else if (valueA > valueB) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedData;
};

export const sortByOtorgadoDescending = <
  T extends { Otorgado: string },
  K extends keyof T
>(
  data: T[],
  property: K
) => {
  return [...data].sort((a, b) => {
    const otorgadoA = parseFloat(a.Otorgado.split(' ')[0]);
    const otorgadoB = parseFloat(b.Otorgado.split(' ')[0]);

    if (otorgadoA < otorgadoB) {
      return 1;
    } else if (otorgadoA > otorgadoB) {
      return -1;
    } else {
      return 0;
    }
  });
};
