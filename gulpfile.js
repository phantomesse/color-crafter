import { src } from 'gulp';
import server from 'gulp-webserver';

export const demo = () => src('.').pipe(server({ port: 1334, open: '/demo' }));
