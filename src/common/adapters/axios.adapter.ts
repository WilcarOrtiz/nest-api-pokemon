import { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/https-adaptar.interface';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdaptar implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is a error - check logs');
    }
  }
}
