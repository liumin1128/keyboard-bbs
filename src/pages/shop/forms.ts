import * as yup from 'yup';
import { Item } from '@/components/Form/v3';

export const createFormItems = [
  {
    key: 'name',
    label: 'Name',
    layout: { sm: 12 },
    schema: yup.string().required(),
  },
  {
    key: 'home',
    label: 'Home',
    layout: { sm: 12 },
  },
  {
    key: 'ua',
    label: 'UA',
    layout: { sm: 12 },
    schema: yup.string().required(),
  },
  {
    key: 'cookies',
    label: 'Cookies',
    layout: { sm: 12 },
    schema: yup.string().required(),
    multiline: true,
    rows: 4,
  },
  {
    key: 'comment',
    label: 'Comment',
    layout: { sm: 12 },
    multiline: true,
    rows: 4,
  },
] as Item[];

export const proxyFormItems = [
  {
    key: 'type',
    label: 'Type',
    layout: { sm: 3 },
    schema: yup.string().required(),
  },
  {
    key: 'host',
    label: 'Host',
    layout: { sm: 6 },
    schema: yup.string().required(),
  },
  {
    key: 'port',
    label: 'Port',
    layout: { sm: 3 },
    schema: yup.string().required(),
  },
  {
    key: 'user',
    label: 'User',
    layout: { sm: 6 },
    schema: yup.string().required(),
  },
  {
    key: 'password',
    label: 'Password',
    layout: { sm: 6 },
    schema: yup.string().required(),
  },
  {
    key: 'soft',
    label: 'Soft',
    layout: { sm: 4 },
    // schema: yup.string().required(),
  },
  {
    key: 'url',
    label: 'Url',
    layout: { sm: 8 },
    // schema: yup.string().required(),
  },
] as Item[];
