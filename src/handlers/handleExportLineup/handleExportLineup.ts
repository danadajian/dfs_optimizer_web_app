import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";

export const handleExportLineup = async (navigator: any, componentRef: any) => {
    const lineupGrid: any = findDOMNode(componentRef.current);
    return html2canvas(lineupGrid, {
        backgroundColor: null,
        scrollY: -window.scrollY,
        useCORS: true,
    }).then((canvas: HTMLCanvasElement) => {
        return canvas.toDataURL('image/png', 1.0)
    }).then((dataUrl: string) => {
        let image = new Image();
        image.src = dataUrl;
        const w = window.open("")!;
        w.document.write(image.outerHTML);
        w.document.close();
        // downloadImage(dataUrl, 'lineup.png');
    })
}
