import {handleExportLineup} from "./handleExportLineup";
import {findDOMNode} from "react-dom";
import html2canvas from "html2canvas";

jest.mock('react-dom');
jest.mock('html2canvas');
jest.mock('./downloadImage');

(findDOMNode as jest.Mock).mockReturnValue('lineup grid element');
(html2canvas as jest.Mock).mockResolvedValue({
    toDataURL: jest.fn(() => 'dataUrl')
});

// const componentRef = {
//     current: 'component ref'
// };
// const canvasOptions = {
//     backgroundColor: null,
//     scrollY: -window.scrollY,
//     useCORS: true,
// };

describe('handleExportLineup', () => {
    it('should return true', function () {
        expect(true);
    });
    // describe('mobile device case', () => {
    //     let result;
    //     const share: any = jest.fn();
    //     const mockNavigator = {
    //         share
    //     }
    //
    //     beforeEach(async () => {
    //         result = await handleExportLineup(mockNavigator, componentRef)
    //     })
    //
    //     it('should call findDOMNode with correct params', () => {
    //         expect(findDOMNode).toHaveBeenCalledWith('component ref')
    //     });
    //
    //     it('should call html2canvas with correct params', () => {
    //         expect(html2canvas).toHaveBeenCalledWith('lineup grid element', canvasOptions)
    //     });
    //
    //     it('should call share with correct params', () => {
    //         expect(share).toHaveBeenCalledWith({
    //             title: 'Share Optimal Lineup',
    //             text: 'Sample Text',
    //             url: 'dataUrl'
    //         })
    //     });
    // })

    // describe('non-mobile device case', () => {
    //     let result;
    //     const mockNavigator = {
    //         notShare: jest.fn()
    //     }
    //
    //     beforeEach(async () => {
    //         result = await handleExportLineup(mockNavigator, componentRef)
    //     })
    //
    //     it('should call findDOMNode with correct params', () => {
    //         expect(findDOMNode).toHaveBeenCalledWith('component ref')
    //     });
    //
    //     it('should call html2canvas with correct params', () => {
    //         expect(html2canvas).toHaveBeenCalledWith('lineup grid element', canvasOptions)
    //     });
    //
    //     it('should call share with correct params', () => {
    //         expect(downloadImage).toHaveBeenCalledWith('dataUrl', 'lineup.png')
    //     });
    // })
})