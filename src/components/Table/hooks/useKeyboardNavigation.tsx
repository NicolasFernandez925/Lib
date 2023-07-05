import { useEffect, RefObject } from "react";

type KeyboardNavigationHookOptions = {
  tableContainerRef: RefObject<HTMLElement>;
  headersSelector: string;
  footerRef: RefObject<HTMLElement>;
};

export const useKeyboardNavigation = ({
  tableContainerRef,
  headersSelector,
  footerRef
}: KeyboardNavigationHookOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentElement = event.target as HTMLElement;
      const tableContainer = tableContainerRef.current;
      const currentFooter = footerRef.current;

      if (!tableContainer) return;

      const tableBody = tableContainer.querySelector(".table-body");
      const headers = Array.from(
        tableContainer.querySelectorAll(headersSelector)
      );

      const currentRow = currentElement.parentElement;
      const currentCellIndex = Array.from(currentRow!.children).indexOf(
        currentElement
      );

      let nextElement: HTMLElement | undefined | null;

      if (event.key === "ArrowUp") {
        const prevRow = currentRow!.previousElementSibling as HTMLElement;
        if (prevRow) {
          nextElement = prevRow.children[currentCellIndex] as HTMLElement;
        }
      } else if (event.key === "ArrowDown") {
        const currentRowIndex = Array.from(tableBody!.children).indexOf(
          currentRow!
        );

        const nextRow = tableBody!.children[currentRowIndex + 1] as HTMLElement;

        if (nextRow) {
          nextElement = nextRow.children[currentCellIndex] as HTMLElement;
        }
      } else if (event.key === "ArrowLeft") {
        const prevCell = currentRow!.children[
          currentCellIndex - 1
        ] as HTMLElement;
        if (prevCell) {
          nextElement = prevCell;
        }
      } else if (event.key === "ArrowRight") {
        const nextCell = currentRow!.children[
          currentCellIndex + 1
        ] as HTMLElement;
        if (nextCell) {
          nextElement = nextCell;
        }
      }

      if (!nextElement) {
        if (event.key === "ArrowUp") {
          if (currentElement === currentFooter) {
            const lastRow = tableBody!.lastElementChild as HTMLElement;
            if (lastRow) {
              const lastCellIndex = Array.from(lastRow.children).length - 1;
              nextElement = lastRow.children[lastCellIndex] as HTMLElement;
            }
          } else {
            nextElement = headers[currentCellIndex] as HTMLElement;
          }
        } else if (event.key === "ArrowDown") {
          nextElement = currentFooter;
        }
      }

      if (nextElement) {
        nextElement.focus();
      }
    };

    const tableContainer = tableContainerRef.current;
    tableContainer?.addEventListener("keydown", handleKeyDown);

    return () => {
      tableContainer?.removeEventListener("keydown", handleKeyDown);
    };
  }, [tableContainerRef, headersSelector, footerRef]);
};
