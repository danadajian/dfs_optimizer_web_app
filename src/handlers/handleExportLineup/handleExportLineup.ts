import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";
import {downloadImage} from "./downloadImage";
import {copyToClipboard} from "./copyToClipboard";

export const handleExportLineup = async (componentRef: any) => {
    let dataUrl: string;
    const lineupGrid: any = findDOMNode(componentRef.current);
    return html2canvas(lineupGrid, {
        backgroundColor: null,
        scrollY: -window.scrollY,
        useCORS: true,
    }).then((canvas: HTMLCanvasElement) => {
        dataUrl = canvas.toDataURL('image/png', 1.0);
        return fetch(dataUrl)
    }).then((response: Response) => {
        return response.blob()
    }).then((blob: Blob) => {
        return copyToClipboard(blob)
    }).then(() => {
        return Promise.resolve()
    }).catch(() => {
        alert('This browser does not support the copy feature.\nDownloading the lineup image instead.')
        downloadImage(dataUrl, 'lineup.png')
    })
};
