/* eslint-disable no-unused-vars */
import { http } from '@web/mocks/http.js';
import mocksFromAnotherFeature from 'another-feature/demo/mocks.js';

/**
 * Define mock scenarios
 */
export default {
  /**
   * Return an object from the handler
   */
  default: [http.get('/api/foo', context => Response.json({ foo: 'bar' }))],
  /**
   * Return native `Response` object from the handler
   */
  error: [http.get('/api/foo', context => new Response('', { status: 400 }))],
  /**
   * Handle additional custom logic in the handler, based on url, searchparams, whatever
   */
  custom: [
    /**
     * Customize based on searchParams
     */
    http.get('/api/users', ({ request }) => {
      const searchParams = new URL(request.url).searchParams;

      if (searchParams.get('user') === '123') {
        return Response.json({ id: '123', name: 'frank' });
      }

      return Response.json({ id: '456', name: 'bob' });
    }),

    /**
     * Customize based on params
     */
    http.get('/api/users/:id', ({ params }) => {
      if (params.id === '123') {
        return new Response('', { status: 400 });
      }

      return Response.json({ id: '456', name: 'bob' });
    }),

    /**
     * Customize based on cookies
     */
    http.get('/api/abtest', ({ cookies }) => {
      return Response.json({ abtest: cookies.segment === 'business' });
    }),
  ],
  /**
   * Provide an async fn, a fn returning an object, a fn returning a Response, or just an object
   */
  returnValues: [
    http.get('/api/foo', async context => Response.json({ foo: 'bar' })),
    http.get(
      '/api/foo',
      async context => new Response(JSON.stringify({ foo: 'bar' }), { status: 200 }),
    ),
    http.get('/api/foo', context => Response.json({ foo: 'bar' })),
    http.get('/api/foo', context => new Response(JSON.stringify({ foo: 'bar' }), { status: 200 })),
  ],
  importedMocks: [
    mocksFromAnotherFeature.default,
    http.get('/api/foo', () => Response.json({ foo: 'bar' })),
  ],
};