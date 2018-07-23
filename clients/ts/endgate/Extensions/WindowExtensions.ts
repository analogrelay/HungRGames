export function OnWindowRepaintCompleted(callback: Function): void {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame((time: number) => callback());
        return;
    }

    setTimeout(callback, 0);
}