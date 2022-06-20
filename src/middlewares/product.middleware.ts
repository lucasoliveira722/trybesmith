import { NextFunction, Request, Response } from 'express';
// import MyError from '../interfaces/myError.interface';

// const prodNameValidator = (name: string): MyError | undefined => {
//   if (!name) return { status: 400, message: '"name" is required' };
//   if (typeof name !== 'string') return { status: 422, message: '"name" must be a string' };
//   if (name.length < 3) {
//     return { status: 422, message: '"name" length must be at least 3 characters long' };
//   } 
// };

const prodNameValidator = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (typeof name !== 'string') return res.status(422).json({ message: '"name" must be a string' });
  if (name.length < 3) {  
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  } 
  next();
};

const prodAmountValidator = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: '"amount" is required' });
  if (typeof amount !== 'string') {
    return res.status(422).json({ message: '"amount" must be a string' });
  }
  if (amount.length < 2) {
    return res.status(422).json({ message: '"amount" length must be at least 3 characters long' });
  }
  next();
};

export default { prodNameValidator, prodAmountValidator };

// const prodNameValidator = (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.body;
//   if (!name) {
//     const nameRequired: MyError = { status: 400, message: '"name" is required' };
//     throw nameRequired;
//   }
// };