import React, { PureComponent, PropTypes } from 'react';
import {
    Card,
    CardMedia,
    CardTitle
} from 'material-ui/Card';

class FinnAd extends PureComponent {
    render() {
        const { style } = this.props;
        const finnAd = this.props.ad && this.props.ad.finnAd;

        return (
            <a
                href={finnAd.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ad"
            >
                <Card
                    style={style}
                >
                    <CardMedia>
                        <img
                            src={finnAd.image.src}
                            alt="Finn.no"
                        />
                    </CardMedia>
                    <CardTitle
                        title={finnAd.title}
                        subtitle={finnAd.description}
                    />
                </Card>
            </a>
        );
    }
}

FinnAd.propTypes = {
    style: PropTypes.object,
    ad: PropTypes.object.isRequired
};

export default FinnAd;
