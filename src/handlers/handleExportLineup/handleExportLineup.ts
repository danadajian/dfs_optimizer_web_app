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

    if (navigator.share) {
        navigator.share({
            title: 'Share Optimal Lineup',
            text: 'This is some text',
            url: 'https://dfsoptimizer.app'
        })
            .then(() => alert('Share successful!'))
            .catch((error: any) => alert(`Share unsuccessful: ${error.toString()}`))
    } else {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        downloadImage(dataUrl, 'lineup.png');
    }
}
