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
        // const newTab = window.open()!;
        // newTab.document.body.innerHTML = `<img src=${dataUrl} alt="lineup">`;

        let byteCharacters = atob(dataUrl.split('data:image/png;base64,')[1]);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let file = new Blob([byteArray], { type: 'image/png' + ';base64' });
        let fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    })
}
