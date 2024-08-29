export function formatNumber2(num) {
    let flooredNum = Math.floor(num * 100) / 100;
    let flooredNumStr = flooredNum.toFixed(2);
    let parts = flooredNumStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export function formatNumber4(num) {
    let flooredNum = Math.floor(num * 10000) / 10000;
    let flooredNumStr = flooredNum.toFixed(4);
    let parts = flooredNumStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export function formatNumber6(num) {
    let flooredNum = Math.floor(num * 1000000) / 1000000;
    let flooredNumStr = flooredNum.toFixed(6);
    let parts = flooredNumStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export function formatNumber10(num) {
    let flooredNum = Math.floor(num * 10000000000) / 10000000000;
    let flooredNumStr = flooredNum.toFixed(10);
    let parts = flooredNumStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}