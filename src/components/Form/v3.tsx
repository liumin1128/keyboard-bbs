/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  ElementType,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  ReactElement,
} from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import * as yup from 'yup';
import {
  useForm,
  UseFormReturn,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Grid, { GridProps } from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import ItemWrapper from './components/ItemWrapper';

export interface FormRefInstance {
  form: UseFormReturn;
}

export interface Values {
  [key: string]: unknown;
}

export interface Item<
  TFieldValues extends FieldValues = Values,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OutlinedInputProps {
  key: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  schema?: yup.AnySchema<unknown>;
  component?: ElementType<{
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }>;
  layout?: GridProps;
  render?: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => ReactElement;
}

interface IFormProps {
  onSubmit?: (values: Values) => void;
  defaultValues?: Values;
  items: Item[];
}

const FormWrapper = forwardRef(
  (modalProps: IFormProps, ref: ForwardedRef<unknown>) => {
    const { onSubmit, defaultValues, items } = modalProps;

    // 生成schema
    const schemaObject: Record<string, yup.AnySchema> = {};
    items.forEach((item) => {
      if (item.schema) {
        schemaObject[item.key] = item.schema;
      }
    });
    const schema = yup.object(schemaObject).required();
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    useImperativeHandle(ref, () => ({
      form,
    }));

    const { handleSubmit, reset, control } = form;

    return (
      <form
        onSubmit={(e) => {
          if (onSubmit) handleSubmit(onSubmit)(e);
          reset();
        }}
      >
        <Grid container spacing={3}>
          {items.map((item) => {
            // 整理 wrapper 相关修饰信息
            const renderWrapper = (children) => {
              const {
                formState: { errors },
              } = form;
              const { key, label, disabled, layout } = item;
              const error = !!get(errors, key, '');
              const helperText = get(errors, `${key}.message`, '');

              return (
                <Grid key={key} item xs={12} {...layout}>
                  <ItemWrapper
                    label={label}
                    helperText={helperText}
                    error={error}
                    disabled={disabled}
                  >
                    {children}
                  </ItemWrapper>
                </Grid>
              );
            };

            // 默认的form组件是InputBase
            const defaultRender = (props) => {
              // eslint-disable-next-line react/prop-types
              const { field } = props;
              // console.log('field: ', field.name);
              // console.log(props);
              // 抽出input自带参数
              const baseInputProps = omit(item, [
                'key',
                'render',
                'component',
                'schema',
                'layout',
                'label',
              ]);

              // 如果传入组件形式 Field
              const { component: Component } = item;
              if (Component) {
                return <Component {...props} form={form} />;
              }

              // 提供默认的 input Field
              return (
                <OutlinedInput
                  {...baseInputProps}
                  sx={{
                    ...baseInputProps.sx,
                    '& input + fieldset': {
                      top: 0,
                    },
                    '& input + fieldset legend': {
                      display: 'none',
                    },
                    '& textarea + fieldset': {
                      top: 0,
                    },
                    '& textarea + fieldset legend': {
                      display: 'none',
                    },
                  }}
                  // eslint-disable-next-line react/prop-types
                  value={field.value || ''}
                  // eslint-disable-next-line react/prop-types
                  onChange={(e) => field.onChange(e.target.value)}
                />
              );
            };

            const { key, render = defaultRender } = item;

            // 注册 Field
            return renderWrapper(
              <Controller
                name={key}
                control={control}
                render={(props) => render({ ...props, form })}
              />,
            );
          })}
        </Grid>
      </form>
    );
  },
);

FormWrapper.defaultProps = {};

export default FormWrapper;
