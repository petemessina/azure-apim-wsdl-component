export function fileDownload(
    fileContent: string,
    mimeType: string,
    fileName: string
) {
    const blob = new Blob([fileContent], {type: mimeType})
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}