import * as yup from 'yup';
import { Item } from '@/components/Form/v3';
import SelectColor from './components/SelectColor';
import pp from '@/hoc/pp';

// const addPrice = {
//   top: {
//     dyb: 0,
//     dynb: 150,
//     dyh: 0,
//     yjh: 200,
//   },
// };

// const labels = {
//   dyb: '电泳白',
//   dynb: '电泳奶白(+150)',
//   dyh: '电泳黄',
//   yjh: '阳极黑(+200)',
// };

export const colorFormItems = [
  {
    key: 'top',
    label: '上盖',
    schema: yup.string().required(),
    component: pp(SelectColor, {
      options: [
        { label: '电泳白', value: 'dyb', backgroundColor: '#ffffff' },
        { label: '电泳奶白(+150)', value: 'dynb', backgroundColor: '#f2f2f2' },
        { label: '电泳黄', value: 'dyh', backgroundColor: '#e1bf25' },
        { label: '阳极黑(+200)', value: 'yjh', backgroundColor: '#000000' },
      ],
    }),
  },

  {
    key: 'bottom',
    label: '底壳',
    schema: yup.string().required(),
    component: pp(SelectColor, {
      options: [
        { label: '电泳白', value: 'dyb', backgroundColor: '#ffffff' },
        { label: '电泳奶白', value: 'dynb', backgroundColor: '#f2f2f2' },
        { label: '电泳黄', value: 'dyh', backgroundColor: '#e1bf25' },
        { label: '阳极黑', value: 'yjh', backgroundColor: '#000000' },
      ],
    }),
  },

  {
    key: 'peizhong',
    label: '配重',
    schema: yup.string().required(),
    component: pp(SelectColor, {
      options: [
        { label: '电泳白', value: 'dyb', backgroundColor: '#ffffff' },
        { label: '电泳奶白', value: 'dynb', backgroundColor: '#f2f2f2' },
        { label: '阳极黑', value: 'yjh', backgroundColor: '#000000' },
      ],
    }),
  },

  {
    key: 'mingpai',
    label: '铭牌',
    schema: yup.string().required(),
    component: pp(SelectColor, {
      options: [
        { label: '电泳白', value: 'dyb', backgroundColor: '#ffffff' },
        { label: '电泳奶白', value: 'dynb', backgroundColor: '#f2f2f2' },
        { label: '阳极黑', value: 'yjh', backgroundColor: '#000000' },
      ],
    }),
  },
] as Item[];
