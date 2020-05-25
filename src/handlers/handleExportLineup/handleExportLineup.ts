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
        return canvas.toDataURL('image/png', 1.0)
    }).then((dataUrl: string) => {
        if (navigator.share) {
            navigator.share({title: 'Share Optimal Lineup', file: getBlobFromUrl(dataUrl)})
                .then(() => alert('Success!'))
                .catch((error: any) => alert(error.toString()));
        } else {
            downloadImage(dataUrl, 'lineup.png');
        }
    })
}

const getBlobFromUrl = async (url: string) => {
    return fetch(url)
        .then(res => res.blob())
        .then(blob => blob);
}