import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";
import {downloadImage} from "./downloadImage";

export const handleExportLineup = async (navigator: any, componentRef: any) => {
    const lineupGrid: any = findDOMNode(componentRef.current);
    return html2canvas(lineupGrid, {
        backgroundColor: null,
        scrollY: -window.scrollY,
        useCORS: true,
    }).then((canvas: HTMLCanvasElement) => {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        if (navigator.share) {
            try {
                // @ts-ignore
                canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({"image/png": blob})]));
            } catch (e) {
                alert(e.toString());
            }
        } else {
            downloadImage(dataUrl, 'lineup.png');
        }
    })
}
