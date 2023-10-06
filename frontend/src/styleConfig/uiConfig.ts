export const uiConfigs = {
  style: {
    gradientBgImage: {
      backgroundImage: "radial-gradient(rgb(0,0,0, 0.3), rgb(0,0,0))",
    },
    horizontalGradientBgImage: {
      backgroundImage:
        "linear-gradient(to top, rgba(18,18,18,1), rgba(18,18,18,0))",
    },
    typoLines: (lines: number, textAlign?: string) => ({
      textAlign: textAlign ?? "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    backgroundImage: (imgPath: string) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
  },
  mainContent: {
    maxWidth: "1430px",
    margin: "auto",
    padding: 2,
  },
};
