import React, { PureComponent, PropTypes } from 'react';
import withRoter from 'react-router/lib/withRouter';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import muiThemeable from 'material-ui/styles/muiThemeable';
import NavDrawer from './NavDrawer';
import auth from '../utils/auth';
import byggrealDark from '../images/byggreal_dark.png';

class Nav extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this._updateAuth = this._updateAuth.bind(this);
        this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
        this._onClickRoute = this._onClickRoute.bind(this);
        this._onTitleTouchTap = this._onTitleTouchTap.bind(this);

        this.state = {
            loggedIn: auth.loggedIn(),
            open: false
        };
    }

    componentWillMount() {
        auth.onChange = this._updateAuth;
    }

    _updateAuth(loggedIn) {
        this.setState({
            loggedIn
        });
    }

    _onLeftIconButtonTouchTap() {
        this.setState({
            open: !this.state.open
        });
    }

    _onClickRoute(event, route) {
        const { router } = this.props;

        router.push(route);

        this.setState({
            open: false
        });
    }

    _onTitleTouchTap() {
        const { router } = this.props;

        router.push('/');
    }

    render() {
        const { loggedIn, open } = this.state;
        const { muiTheme, location } = this.props;

        return (
            <div>
                <AppBar
                    title={
                        <img
                            src={byggrealDark}
                            className="vertical-align-middle"
                            alt="Byggreal"
                        />
                    }
                    zDepth={0}
                    onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                    onTitleTouchTap={this._onTitleTouchTap}
                    iconElementLeft={
                        <IconButton>
                            <NavigationMenu />
                        </IconButton>
                    }
                    iconElementRight={
                        <IconButton
                            iconClassName="mdi mdi-facebook"
                            href="https://www.facebook.com/Byggreal-AS-167667106644338"
                            target="_blank"
                        />
                    }
                    style={{
                        position: 'fixed',
                        top: 0,
                        zIndex: muiTheme.zIndex.appBar + 1
                    }}
                />
                <NavDrawer
                    loggedIn={loggedIn}
                    open={open}
                    onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                    location={location}
                    onClickRoute={this._onClickRoute}
                />
            </div>
        );
    }
}

Nav.propTypes = {
    muiTheme: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default muiThemeable()(withRoter(Nav));
