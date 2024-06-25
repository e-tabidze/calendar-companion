export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await require('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await require('../sentry.edge.config');
  }
}

// export async function logging() {
//   console.log('sentry logging')
// }
