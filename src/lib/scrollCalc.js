
export function calcWindowFromScroll(windowHeight, scrollPercent){
    return (scrollPercent / 100) * (document.body.scrollHeight - windowHeight)
}

export function calcScrollFromWindow(windowHeight, scrollY){
    let roundedProgress = Math.round((100 * scrollY) / (document.body.scrollHeight - windowHeight));
    return Math.min(Math.max(roundedProgress, 0), 100);
}