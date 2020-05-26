import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";
import {downloadImage} from "./downloadImage";
import Share from "react-native-share";

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
            Share.open({
                url: dataUrl,
                type: 'image/png',
                message: 'Share Optimal Lineup'
            })
                .then(() => alert('Success'))
                .catch((error: any) => alert(error.toString()));
        } else {
            downloadImage(dataUrl, 'lineup.png');
        }
    })
}
