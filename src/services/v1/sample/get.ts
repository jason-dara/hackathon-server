import csv from 'csvtojson';
import { distance } from '../../../utils/distance';
import { ErrorHandler } from './../../../utils/error';
import path from 'path';

interface IData {
    id: string;
    lng: number;
    lat: number;
    alt: number;
}

interface IResponse extends IData {
    distance: number;
}

const get = async (
    lng: number,
    lat: number,
    alt: number,
    radius: number
): Promise<IResponse[]> => {
    try {
        const rawData = await csv().fromFile(
            path.join(__dirname, '../../../../data/data.csv')
        );
        const data: IData[] = [];
        rawData.forEach((item) => {
            data.push({
                id: item.ID,
                lng: parseFloat(item.lng),
                lat: parseFloat(item.lat),
                alt: parseFloat(item.alt)
            });
        });
        const response: IResponse[] = [];
        data.forEach((item) => {
            const dist = distance(item.lng, lng, item.lat, lat, item.alt, alt);
            if (dist <= radius) {
                response.push({
                    id: item.id,
                    lat: item.lat,
                    lng: item.lng,
                    alt: item.alt,
                    distance: dist
                });
            }
        });
        return response;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

export default get;
