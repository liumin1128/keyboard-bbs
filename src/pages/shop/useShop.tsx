import { useEffect } from 'react';
import get from 'lodash/get';
// import { useSnackbar } from 'notistack';
import { StoreObject } from '@apollo/client';
import { source$ } from '@/wrappers/apollo-provider/apollo';
import {
  useFindShopsQuery,
  ShopCreatedDocument,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useShopUpdatedSubscription,
  useShopDeletedSubscription,
} from '@/generated/graphql';

export default function useShop() {
  // const { enqueueSnackbar } = useSnackbar();

  const {
    data = {},
    loading,
    refetch,
    error,
    subscribeToMore,
  } = useFindShopsQuery({
    variables: {},
  });

  // 会自动更新
  useShopUpdatedSubscription();

  // https://www.apollographql.com/docs/react/v2/api/react-hooks/#usesubscription
  useShopDeletedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      const _id = get(subscriptionData, 'data.shop._id');
      client.cache.modify({
        fields: {
          findShops(refs, { readField }) {
            return refs.filter(
              (ref: StoreObject) => _id !== readField('_id', ref),
            );
          },
        },
      });
    },
  });

  const [createShop] = useCreateShopMutation();
  const [updateShop] = useUpdateShopMutation();
  const [deleteShop] = useDeleteShopMutation();

  useEffect(() => {
    subscribeToMore({
      document: ShopCreatedDocument,
      updateQuery: (prev, args) => {
        // console.log('prev');
        // console.log(prev);
        // console.log('args');
        // console.log(args);
        const { subscriptionData } = args;
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.shop;
        return {
          ...prev,
          shops: [...prev.shops, newItem],
        };
      },
    });
  }, [subscribeToMore]);

  // 订阅断线重连
  useEffect(() => {
    // subscribe函数的返回结果存为变量subscription
    const subscription = source$.subscribe({
      complete: () => {
        console.log('complete:');
      },
      next: (s) => {
        console.log('next:', s);
        switch (s) {
          case 'onConnected': {
            // enqueueSnackbar('Connected', {
            //   variant: 'success',
            //   autoHideDuration: 1000,
            // });
            break;
          }
          case 'onReconnected': {
            // enqueueSnackbar('Reconnected', {
            //   variant: 'success',
            //   autoHideDuration: 1000,
            // });
            refetch();
            break;
          }
          case 'onDisconnected': {
            // enqueueSnackbar('Disconnected', {
            //   variant: 'error',
            //   autoHideDuration: 1000,
            // });
            break;
          }
          case 'onReconnecting': {
            // enqueueSnackbar('Reconnecting', {
            //   variant: 'info',
            //   autoHideDuration: 1000,
            // });
            break;
          }
          default:
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refetch]);

  return {
    data,
    loading,
    error,
    createShop,
    updateShop,
    deleteShop,
  };
}
