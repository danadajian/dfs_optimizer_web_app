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
        const newTab = window.open()!;
        newTab.document.body.innerHTML = `<img src=${dataUrl} alt="lineup">`;
    })
}
