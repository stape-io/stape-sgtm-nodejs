import axios from 'axios';
import { StapeSGTMOptions } from './types/StapeSGTMOptions';
import { StapeSGTM } from './StapeSGTM';
import { EventData } from './types/EventData';
import { StapeSGTMError } from './StapeSGTMError';

jest.mock('axios');

describe('StapeSGTM', () => {
  function createTestInstance(options: Partial<StapeSGTMOptions> = {}) {
    return new StapeSGTM({
      gtm_server_domain: 'https://example.com',
      request_path: '/data',
      ...options,
    });
  }

  const eventData: EventData = { ip_override: '79.144.69.69' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send event data and return the response data', async () => {
    const instance = createTestInstance();

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: 'response data' });

    const response = await instance.sendEventData('event', eventData);

    expect(response).toBe('response data');

    expect(axios.post).toHaveBeenCalledWith(
      'https://example.com/data?v=2&event_name=event',
      {
        ...eventData,
        event_name: 'event',
        v: 2,
      },
    );
  });

  it('should send event data with richsstsse and return the response data', async () => {
    const instance = createTestInstance({ richsstsse: true });
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: 'response data' });

    const response = await instance.sendEventData('event', eventData);

    expect(response).toBe('response data');

    expect(axios.post).toHaveBeenCalledWith(
      'https://example.com/data?v=2&event_name=event&richsstsse=',
      {
        ...eventData,
        event_name: 'event',
        v: 2,
      },
    );
  });

  it('should use /data as default request path', async () => {
    const instance = createTestInstance({ request_path: undefined });
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: 'response data' });
    const response = await instance.sendEventData('event', eventData);
    expect(response).toBe('response data');
    expect(axios.post).toHaveBeenCalledWith(
      'https://example.com/data?v=2&event_name=event',
      {
        ...eventData,
        event_name: 'event',
        v: 2,
      },
    );
  });

  it('should throw StapeSGTMError on axios error', async () => {
    const instance = createTestInstance();

    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 500,
        statusText: 'Internal Server Error',
        data: 'Error data',
      },
    });

    await expect(instance.sendEventData('event', eventData)).rejects.toThrow(
      StapeSGTMError,
    );
  });

  it('should throw StapeSGTMError with empty details', async () => {
    const instance = createTestInstance();

    (axios.post as jest.Mock).mockRejectedValueOnce({});

    await expect(instance.sendEventData('event', eventData)).rejects.toThrow(
      StapeSGTMError,
    );
  });

  it('should validate configuration', () => {
    expect(() => {
      new StapeSGTM({
        gtm_server_domain: 'invalid-domain',
        request_path: '/data',
      });
    }).toThrowError('You did not fill in the variable gtm_server_domain');

    expect(() => {
      new StapeSGTM({
        gtm_server_domain: 'https://example.com',
        request_path: 'invalid-path',
      });
    }).toThrowError('You did not fill in the variable request_path');
  });
});
