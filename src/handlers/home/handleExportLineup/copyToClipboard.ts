export const copyToClipboard = (blob: Blob) => {
    // @ts-ignore
    return navigator.clipboard.write([new ClipboardItem({"image/png": blob})])
}