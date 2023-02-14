const distance = (x1: number, x2: number, y1: number, y2: number, z1: number, z2: number) => {
    return Math.sqrt(((Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2)) + (Math.pow((z1 - z2), 2))));
};

export {
    distance
};
