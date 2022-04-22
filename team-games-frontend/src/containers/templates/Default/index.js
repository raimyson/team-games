import React, {Component, Suspense, lazy} from 'react';
import {Redirect, Switch} from 'react-router-dom';
import * as router from 'react-router-dom';
import {Container} from 'reactstrap';

import {
	AppAside,
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppBreadcrumb2 as AppBreadcrumb,
	AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

//nav config
import navigation from '../../../utils/_nav';

import {Loading} from '../../../components';

// const DefaultAside = lazy(() => import('./Aside'));
const DefaultFooter = lazy(() => import('./Footer'));
const DefaultHeader = lazy(() => import('./Header'));
// const {Loading} = lazy(() => import('../../../components/atoms/Loading'));


class DefaultLayout extends Component {
	loading = () => <Loading />;

	signOut(e) {
		e.preventDefault();
		this.props.history.push('/login');
	}

	render() {
		return (
			<div className='app'>
				<AppHeader fixed>
					<Suspense fallback={this.loading()}>
						<DefaultHeader />
					</Suspense>
				</AppHeader>
				<div className={ this.props.className +' app-body'}>
					{/* <AppSidebar fixed display='lg'>
						<AppSidebarHeader />
						<AppSidebarForm />
						<Suspense>
							<AppSidebarNav navConfig={navigation} {...this.props} router={router} />
						</Suspense>
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar> */}
					<main className='main'>
						{/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
						<Container fluid>
							<Suspense fallback={this.loading()}>
								<Switch>
									{this.props.children}
								</Switch>
							</Suspense>
						</Container>
					</main>
					<AppAside fixed>
						<Suspense fallback={this.loading()}>
							{/* <DefaultAside /> */}
						</Suspense>
					</AppAside>
				</div>
				<AppFooter>
					<Suspense fallback={this.loading()}>
						<DefaultFooter />
					</Suspense>
				</AppFooter>
			</div>
		);
	}
}

export default DefaultLayout;
