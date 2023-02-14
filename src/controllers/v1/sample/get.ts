import { ErrorHandler } from '../../../utils/error';
import { get as getService } from './../../../services/v1/sample.service';
import { NextFunction, Request, Response } from 'express';
import { sampleConstants, statusCodes } from '../../../config/constants';

const get = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> => {
    try {
        if (!parseFloat(req.body.lng) && req.body.lng !== 0) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                sampleConstants.MISSING_PARAM_LNG
            );
        }
        if (!parseFloat(req.body.lat) && req.body.lat !== 0) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                sampleConstants.MISSING_PARAM_LAT
            );
        }
        if (!parseFloat(req.body.alt) && req.body.alt !== 0) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                sampleConstants.MISSING_PARAM_ALT
            );
        }
        if (!parseFloat(req.body.radius) && req.body.radius !== 0) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                sampleConstants.MISSING_PARAM_RADIUS
            );
        }
        const response = await getService(req.body.lng, req.body.lat, req.body.alt, req.body.radius);
        return res.status(statusCodes.SUCCESS).json(response);
    } catch (error) {
        next(error);
    }
};

export default get;
