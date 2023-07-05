import { useEffect, useState } from "react";

export const useResizable = (tableContainerId: string) => {
  const [height, setHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateTableHeight = () => {
      const windowHeight = window.innerHeight;

      const tableContainer = document.getElementById(tableContainerId);
      if (tableContainer) {
        const tableContainerHeight = tableContainer.offsetHeight;
        if (tableContainerHeight > windowHeight) {
          setHeight(`${windowHeight}px`);
        } else {
          setHeight(undefined);
        }
      }
    };

    window.addEventListener("resize", updateTableHeight);
    return () => {
      window.removeEventListener("resize", updateTableHeight);
    };
  }, [tableContainerId]);

  return height;
};
