import puppeteer from "puppeteer";

interface Props {
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  url: string;
  viewportHeight: number;
  viewportWidth: number;
}
export const cropImage = async ({  selectionCoords, url, viewportHeight, viewportWidth }: Props) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1.5,
  })

  await page.goto(url, { waitUntil: 'networkidle0' })

  const screenshot = await page.screenshot({
    clip: {
      x: selectionCoords.x,
      y: selectionCoords.y,
      width: selectionCoords.width,
      height: selectionCoords.height,
    },
  })

  return screenshot;
};
