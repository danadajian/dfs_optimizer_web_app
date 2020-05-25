import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";
import {downloadImage} from "./downloadImage";

export const handleExportLineup = async (navigator: any, componentRef: any) => {
    const lineupGrid: any = findDOMNode(componentRef.current);
    const canvas = await html2canvas(lineupGrid, {
        backgroundColor: null,
        scrollY: -window.scrollY,
        useCORS: true,
    });
    const dataUrl = canvas.toDataURL('image/png', 1.0);

    if (navigator.share) {
        // @ts-ignore
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
        // @ts-ignore
            .then(() => alert('Copied to clipboard!'))
            .catch((error: any) => alert(error.toString()));
    } else {
        downloadImage(dataUrl, 'lineup.png');
    }
}