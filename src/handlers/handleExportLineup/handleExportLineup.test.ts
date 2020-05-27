import {handleExportLineup} from "./handleExportLineup";
import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";
import {downloadImage} from "./downloadImage";
import {copyToClipboard} from "./copyToClipboard";

jest.mock('react-dom');
jest.mock('html2canvas');
jest.mock('./downloadImage');
jest.mock('./copyToClipboard');

(findDOMNode as jest.Mock).mockReturnValue('lineup grid element');
(html2canvas as jest.Mock).mockResolvedValue({
    toDataURL: jest.fn(() => 'dataUrl'),
    toBlob: jest.fn(() => 'blob')
});
jest.spyOn(window, 'alert').mockImplementation(() => jest.fn());
// @ts-ignore
jest.spyOn(global, 'fetch').mockImplementation(() => {
    return {
        blob: () => 'blob'
    }
});

const componentRef = {
    current: 'component ref'
};
const canvasOptions = {
    backgroundColor: null,
    scrollY: -window.scrollY,
    useCORS: true,
};

describe('handleExportLineup', () => {
    describe('clipboard supported case', () => {
        let result;

        beforeEach(async () => {
            (copyToClipboard as jest.Mock).mockReturnValue(Promise.resolve());
            result = await handleExportLineup(componentRef)
        })

        it('should call findDOMNode with correct params', () => {
            expect(findDOMNode).toHaveBeenCalledWith('component ref')
        });

        it('should call html2canvas with correct params', () => {
            expect(html2canvas).toHaveBeenCalledWith('lineup grid element', canvasOptions)
        });

        it('should call fetch with dataUrl', () => {
            expect(fetch).toHaveBeenCalledWith('dataUrl')
        });

        it('should call share with correct params', () => {
            expect(copyToClipboard).toHaveBeenCalledWith('blob')
        });
    })

    describe('clipboard not supported case', () => {
        let result;

        beforeEach(async () => {
            (copyToClipboard as jest.Mock).mockReturnValue(Promise.reject())
            result = await handleExportLineup(componentRef)
        })

        it('should call findDOMNode with correct params', () => {
            expect(findDOMNode).toHaveBeenCalledWith('component ref')
        });

        it('should call html2canvas with correct params', () => {
            expect(html2canvas).toHaveBeenCalledWith('lineup grid element', canvasOptions)
        });

        it('should call fetch with dataUrl', () => {
            expect(fetch).toHaveBeenCalledWith('dataUrl')
        });

        it('should call window alert', () => {
            expect(window.alert).toHaveBeenCalledWith('This browser does not support the copy feature.\n' +
                'Downloading the lineup image instead.')
        });

        it('should call share with correct params', () => {
            expect(downloadImage).toHaveBeenCalledWith('dataUrl', 'lineup.png')
        });
    })
})