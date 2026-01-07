import express from 'express';
import cors from 'cors';
export function setupMiddlewares(app, config) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}
