export function backToTop() {
    let anchorElement = document.getElementById('reader_content');
    if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
}