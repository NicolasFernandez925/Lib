import React, { CSSProperties, ReactNode, useEffect } from "react";
import "./Tooltip.css";

type TooltipProps = {
  position: "left" | "right" | "top" | "bottom";
  content: string;
  children: ReactNode;
  classNames?: CSSProperties;
};

export const Tooltip: React.FC<TooltipProps> = ({
  position,
  content,
  children,
  classNames
}) => {
  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "10px"
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "10px"
        };
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "10px"
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "10px"
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    if (classNames?.backgroundColor || classNames?.background) {
      document.documentElement.style.setProperty(
        "--tooltip-color",
        String(classNames.backgroundColor || classNames?.background)
      );
    }
  }, [classNames]);

  const tooltipStyles: CSSProperties = classNames
    ? {
        ...getPositionStyle(),
        ...classNames
      }
    : getPositionStyle();

  return (
    <div className="tooltip-container">
      {React.cloneElement(children as React.ReactElement<any>, {
        "aria-describedby": "tooltip"
      })}

      <div
        id="tooltip"
        className={`tooltip tooltip-${position}`}
        style={tooltipStyles}
        role="tooltip"
        aria-live="assertive"
      >
        {content}
      </div>
    </div>
  );
};
