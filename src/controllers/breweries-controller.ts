import { breweriesService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const getData = async (req: Request, res: Response) => {
  const { query } = req.query;
  let url = 'https://api.openbrewerydb.org/breweries';
  if (query) url += `/search?query=${query}`;

  const response = await breweriesService.getData(url);

  res.status(httpStatus.OK).send(response);
};
