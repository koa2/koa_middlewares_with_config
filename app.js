const Koa = require('koa');
const etag = require('koa-etag');
const favicon = require('koa-favicon');
const app = new Koa();

app.use((ctx, next) => {
  return next().then(() => {
    console.log('hello etag fresh= ' + ctx.fresh)
    if (ctx.fresh) {
      ctx.status = 304;
      ctx.body = null;
    }
  });
})

var conf = {
  'koa-favicon': {
    'path': 'sss',
    'options': {
      'maxAge': 1
    }
  },
  'koa-etag':{
    
  }
}

var middlewares = require('.')(['koa-favicon', 'koa-etag'], conf)

app.use(middlewares)

app.use((ctx, next)=>{
  console.log('hello etag fresh= ' + ctx.fresh)
  ctx.body = '<h1>hello etag</h1>'
  // ctx.etag = 'etaghaha';
  console.log('hello etag fresh= ' + ctx.fresh)
})

app.listen(3005);
