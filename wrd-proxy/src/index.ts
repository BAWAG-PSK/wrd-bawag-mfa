import express, { Request, Response } from 'express';
import { modules } from './config/modules';
import httpProxy from 'http-proxy';
import cors from 'cors';
import { LoginDto } from './login.dto';
import { ServerResponse } from "http";
import cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const port = 50000;
const host = 'localhost';

const proxy = httpProxy.createProxyServer();

const _app = express();
const router = express.Router();

proxy.on('error', (err: Error, req, res) => {
  console.warn('Proxy error', err);
  res.writeHead(500, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ errorType: 'proxy' }));
});

_app.use(cors());
_app.use(bodyParser.json());
_app.use(bodyParser.urlencoded({ extended: true }));
_app.use((err: any, req: any, res: any, next: any) => res.status(500).end());
_app.use('/', router);

router.use('/api', cookieParser());

_app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body as LoginDto;

  if (username === 'weAreDevelopers' && password === '123') {
    res.status(200).send({ status: 'authenticated' });
  } else {
    res.status(403).send({ status: 'unauthorized' });
  }
});

// @ts-ignore
Object.entries(modules).forEach(([ k, m ]) => {
  if (m.assetsUrl != null) {
    if (m.path === '/wrd-cl') {
      router.get(`/assets/wrd-cl/*`, (req, res) => {
        let targetPath = `${ req.path.replace('/assets' + m.path, '') }`;

        const referer = req.header('Referer');
        let match = false;

        // handle lazy loaded chunks
        if (referer && targetPath.endsWith('.js')) {
          // handles lazy loading that happens inside the MF
          // @ts-ignore
          Object.entries(modules).forEach(([ mfKey, mfModule ]) => {
            if (referer.indexOf(`/wrd-cl/dashboard${ mfModule.path }`) !== -1) {
              match = true;
              let realHost = mfModule.assetsUrl;

              // is the real source in an auxiliary route?
              if (referer.match(/\(\w+:\w+\)/)) {
                const auxRoute = referer.substring(referer.indexOf('('));
                const mf = auxRoute.substring(auxRoute.indexOf(':') + 1, auxRoute.indexOf('/'));
                // @ts-ignore
                realHost = Object.entries(modules)
                                 .filter(([ mKey, mValue ]) => mValue.path === `/${ mf }`)
                                 .map(([ mKey, mValue ]) => mValue.assetsUrl)[0];
              }

              return invokeProxy(req, res, `${ realHost }${ targetPath }`);
            }
          });
        }

        if (!match) {
          let match2 = false;
          // @ts-ignore
          Object.entries(modules).forEach(([ mfKey, mfModule ]) => {
            // is real target coded in auxiliary route?
            const realTarget = targetPath.match(/\(\w+:\w+\)/) ? targetPath.substring(0, targetPath.indexOf('(')) : targetPath;

            if (realTarget === mfModule.path) {  // real target a micro frontend?
              match2 = true;
              // this query parameter is handled by the refresh resolver of the CL to load the correct MF
              return res.redirect(`/?redirectTo=${ realTarget }`); // '/' => '/assets/wrd-cl/'
            }
          });

          if (!match2) {
            if (targetPath.startsWith('/dashboard')) {
              // this query parameter is handled by the refresh resolver of the CL to load the correct MF
              if (targetPath.indexOf('/tic-tac-toe') !== -1) {
                targetPath = targetPath.slice(0, targetPath.indexOf('/tic-tac-toe') + 12);
              }

              return res.redirect(`/?redirectTo=${ targetPath }`);
            }

            // load assets from CL
            return invokeProxy(req, res, `${ m.assetsUrl! }${ targetPath }`);
          }
        }
      });
    } else {
      router.get(`/assets${ m.path }*`, (req, res) => {
        const targetPath = `${ req.path.replace('/assets' + m.path, '') }`;
        return invokeProxy(req, res, `${ m.assetsUrl! }${ targetPath }`);
      });
    }
  }
});

router.get('*', (req, res) => {
  // @ts-ignore
  console.log(req.path);
  const [ _, masterModule ] = Object.entries(modules)[0];
  if (!validProxyPath(req.path)) {
    console.log('error');
    res.status(400).end();
    return;
  }

  return invokeProxy(req, res, `${ masterModule.assetsUrl! }${ req.path }`);
});

function invokeProxy(req: Request, res: ServerResponse, target: string) {
  return proxy.web(req, res, {
    ignorePath: true,
    changeOrigin: true,
    target
  });
}

export function validProxyPath(p: string) {
  return p.length === 0 || p.startsWith('/');
}

_app
  .listen(port, host, () => {
    console.log(`Reverse proxy listening on http://${ host }:${ port }`);
  })
  .on('error', console.error);

export const app = _app;
