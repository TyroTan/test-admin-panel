/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Component,
  FC,
  ReactElement,
  ComponentClass,
  FunctionComponent,
} from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import { getCurrentSession } from 'utils/';
import { withRouter, Redirect } from 'react-router-dom';
import { RouteComponentProps, StaticContext } from 'react-router';

type AsyncComponentType =
  | ComponentClass<any, any>
  | FunctionComponent<any>
  | ComponentClass<RouteComponentProps<any, StaticContext, any>, any>
  | FunctionComponent<RouteComponentProps<any, StaticContext, any>>
  | undefined;

export default function asyncComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentProps: any,
  importComponent: () => DynamicImportType | any,
): Component {
  if (!importComponent) importComponent = parentProps;

  interface AsyncFuncProps {
    mounted: boolean;
  }

  interface AsyncFuncState {
    component: FC | Component | null;
    authed: boolean;
    authedButRedirectTo: string;
  }

  class AsyncFunc extends Component<
    AsyncFuncProps & AsyncFuncState & RouteComponentProps
  > {
    public mounted = false;
    public state = {
      component: null,
      authed: true,
      authedButRedirectTo: '',
    };
    public constructor(
      props: AsyncFuncProps & AsyncFuncState & RouteComponentProps,
    ) {
      super(props);
    }

    // public componentWillMount(): void {
    //   Nprogress.start();
    // }

    public componentWillUnmount(): void {
      this.mounted = false;
    }

    public async componentDidMount(): Promise<void> {
      Nprogress.start();
      this.mounted = true;
      const { default: Component } = await importComponent();

      try {
        if (parentProps.requiresAuth === true) {
          const authed = await getCurrentSession();
          Nprogress.done();

          if (authed && authed.token) {
            if (this.mounted) {
              if (
                parentProps.ifAuthedRedirectTo &&
                typeof parentProps.ifAuthedRedirectTo === 'string'
              ) {
                this.setState({
                  authedButRedirectTo: parentProps.ifAuthedRedirectTo,
                });

                return;
              }

              this.setState({
                component: <Component {...this.props} />,
              });
            }
          } else {
            this.setState({
              authed: false,
              component: <Component {...this.props} />,
            });
            return;
          }
        }
        // const { default: Component } = await importComponent();
        // Nprogress.done();
        // if (this.mounted) {
        //   this.setState({
        //     component: <Component {...this.props} />
        //   });
        // }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error, redirect to login', e);
        this.mounted = false;
        Nprogress.done();
        // this.setState({
        //   authed: false
        // });
      }
    }

    public render(): ReactElement {
      const Component = this.state.component || <div />;
      const { pathname } = this.props.location;

      if (this.state.authed === true) {
        if (this.state.authedButRedirectTo) {
          return (
            <Redirect
              to={{
                pathname: this.state.authedButRedirectTo,
              }}
            />
          );
        }

        return (
          <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
            {Component}
          </ReactPlaceholder>
        );
      } else {
        if (pathname === '/login') {
          return (
            <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
              {Component}
            </ReactPlaceholder>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: this.props.location },
              }}
            />
          );
        }
      }
    }
  }

  return (withRouter(AsyncFunc) as unknown) as any;
}
