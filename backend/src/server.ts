import express, { type Request, type Response } from 'express';
import app from './app.ts';

const { PORT } = process.env;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, ( ) => {
  console.log({msg: `Server running...`})
});