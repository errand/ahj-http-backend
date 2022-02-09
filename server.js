const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));

app.use(koaBody({
  urlencoded: true,
}));

app.use(koaBody({
  text: true, urlencoded: true, json: true, multipart: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' }; // сервер может быть вызван из любого источника
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set(
        'Access-Control-Allow-Headers',
        ctx.request.get('Access-Control-Allow-Request-Headers'),
      );
    }
    ctx.response.status = 204; // No content
  }
});

app.use(async ctx => {
  const { name, phone } = ctx.request.querystring;

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  if (subscriptions.has(phone)) {
    ctx.response.status = 400;
    ctx.response.body = 'You already subscribed';
  }
  subscriptions.set(phone, name);
  ctx.response.body = 'Ok';
});

const server = http.createServer(app.callback()).listen(PORT);
